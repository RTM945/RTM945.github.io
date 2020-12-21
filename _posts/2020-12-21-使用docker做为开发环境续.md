---
layout: post
title: 使用docker作为开发环境续
tags: 
- docker
---  

对[上一篇文章](https://rtmsoft.me/%E4%BD%BF%E7%94%A8docker%E4%BD%9C%E4%B8%BA%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83.html)做一点补充  

### windows docker desktop 占用c盘空间太大

爆栈网上有个很清晰的[解决方法](https://stackoverflow.com/a/63752264/4276950)，可以迁移 `docker-desktop-data`

WSL 2 docker-desktop-data 虚拟机镜像文件（也就是docker存储所有数据的文件）通常位于`%USERPROFILE%\AppData\Local\Docker\wsl\data\ext4.vhdx`  

跟随下面的步骤可以完整的将文件迁移

首先，退出docker desktop，保险起见还可以执行
```
wsl --shutdown
```
继续输入
```
wsl --list -v
```
可以看到如下显示，确保STATE都是Stopped
```
NAME                   STATE           VERSION
* docker-desktop         Stopped         2
  docker-desktop-data    Stopped         2
```
导出docker-desktop-data到文件
```
wsl --export docker-desktop-data "D:\Docker\wsl\data\docker-desktop-data.tar"
```
从wsl取消注册docker-desktop-data，注意这一步之后，ext4.vhdx文件会自动被删除
```
wsl --unregister docker-desktop-data
```
将docker-desktop-data导回wsl，但此时ext4.vhdx会定位到不同的地址
```
wsl --import docker-desktop-data "D:\Docker\wsl\data" "D:\Docker\wsl\data\docker-desktop-data.tar" --version 2
```
重新启动docker desktop，应该可以运行

如果验证没有任何问题，就可以删除docker-desktop-data.tar文件了，注意不要删除ext4.vhdx

一个小坑：   
本人在尝试后，docker desktop启动总是报错，卸载重装也不可以，翻了一个[issue](https://github.com/docker/for-win/issues/5256)后，找到一个谜之解决方法
```
netsh winsock reset
```
其实对这个命令不陌生，因为有使用一个软件叫Proxifier，这个软件启动后也经常会出现一些网络相关问题，需要使用这个命令还原

为什么这个命令可以解决我的问题就不得而知了，特此记录希望之后可以有所帮助

### vscode remote development自带node环境
有时候根本不需要node，找到了一个方法不去下载它，但比较麻烦  

使用vscode remote development extension导入的项目，vscode会创建一个文件夹 `.devcontainer`，找到Dockerfile中的`[Option] Install Node.js`下面注释掉即可 

于是操作步骤变成了这样：

1. vscode F1 Remote-Containers: Open Folder in Container 选中文件夹  
2. 看到从微软下载好了`.devcontainer`，想办法停止下载镜像，比如关掉vscode
3. 修改Dockerfile
4. 打开vscode重新下载

看上去很不智能，希望有一天这些Dockerfile不要再带上node环境，或者直接给官方提issue

### 镜像下载缓慢
gfw总是搞的人很崩溃，对于这种情况，有几种解决方法，但也有一些坑

第一个想到的是添加国内的docker mirror，有网易的阿里云的DaoCloud的，docker desktop配置中加入就行

有的人可能会整个网络环境都已经代理了，比如在路由器上做的代理，这样也挺好

现在记录一个没有折腾路由器，mirror也没有设置，只依赖本地启动的代理，如shadowsocks/v2rayN等工具，遇到的一些坑

首先，docker desktop配置中的Proxies，与镜像下载无关，只是连接docker hub，docker desktop本身的代理

可以在前面提到的Dockfile中，追加ENV参数，如
```
FROM mcr.microsoft.com/vscode/devcontainers/ruby:0-2

# ENV Variables required by Jekyll
ENV LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    TZ=Etc/UTC \
    LC_ALL=en_US.UTF-8 \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US \
    HTTP_PROXY="http://host:port" \
    HTTPS_PROXY="http://host:port"
# Install bundler
RUN gem install bundler
```
首先，注意这里的`HTTP_PROXY`和`HTTPS_PROXY`是在[官方文档](https://docs.docker.com/network/proxy/#use-environment-variables)中看到的参数，然而镜像中的程序使用它可能有问题，比如这个Dockerfile执行时可以看到ruby的日志输出，大意是没有找到`HTTP_PROXY`参数，使用`http_proxy`替代

关于变量名，还需要继续研究

其次，注意这里的host，平时本地起proxy local server时，其他的软件设置代理都会使用`localhost`或`127.0.0.1`，然而这个ENV生效的环境，已经是在容器内了，继续使用`localhost`或`127.0.0.1`肯定是不行的，容器需要使用宿主机的代理

这里有个很简单易懂的方法：host改为宿主机的局域网ip，并且使用的代理软件需要打开`允许局域网的连接`开关

关于官方文档中提到的[另一种配置方法](https://docs.docker.com/network/proxy/#configure-the-docker-client)，很遗憾没有测试成功，不管将代理设置为`localhost`还是宿主机的局域网ip，都无法继续下载镜像，还需要继续研究

另一个很麻烦的点：如果保留了Dockerfile中的`[Option] Install Node.js`，则会发现，不管怎么设置，都不会走代理，可能对于
```
RUN su vscode -c "source /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"
```
这个命令，还需要额外的配置

不过暂时先注掉了，下次再说吧