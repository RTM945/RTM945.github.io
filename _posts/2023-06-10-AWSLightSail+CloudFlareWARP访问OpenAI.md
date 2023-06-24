---
layout: post
title: AWS LightSail + CloudFlare WARP 访问 OpenAI
tags: 
- fuckgfw
---  

OpenAI 和 GFW 双向奔赴，甚至墙掉了大部分的云服务器厂商，于是对装了 V2Ray 的 AWS LightSail 进行改造以支持访问 OpenAI。

大部分思路和操作来自 [左耳朵耗子的文章](https://github.com/haoel/haoel.github.io) 。 

在此谨表达对耗子哥的感谢和追思，R.I.P

### 安装 CloudFlare WARP 

参看 [10.4.2 代理模式](https://github.com/haoel/haoel.github.io/blob/master/README.md#1042-%E4%BB%A3%E7%90%86%E6%A8%A1%E5%BC%8F) 

以下是最低配 LightSail 可能会遇到的问题

```
The following packages have unmet dependencies:
cloudflare-warp : Depends: nftables but it is not going to be installed
                  Depends: gnupg2 but it is not going to be installed
                  Depends: desktop-file-utils but it is not going to be installed
                  Depends: libnss3-tools but it is not going to be installed
linux-headers-aws : Depends: linux-headers-5.3.0-1028-aws but it is not going to be installed
E: Unmet dependencies. Try 'apt --fix-broken install' with no packages (or specify a solution).
```

先执行 `sudo apt --fix-broken install`，然后再执行 `sudo apt install cloudflare-warp` 即可。

```
warp-cli connect
Status update: Unable to connect. Reason: Insufficient system resource: file descriptor
```

修改文件描述符的限制，编辑 `/lib/systemd/system/warp-svc.service`，在 `[Service]` 下面添加如下内容：

```
LimitNOFILE=65535
LimitNOFILESoft=65535
```

warp程序有内存泄露问题，运行 `crontab -e`，然后添加如下内容：
```
0 * * * * /bin/systemctl restart warp-svc
```

注意，耗子哥原文中 `restart` 写错成了 `resetart`

### 修改V2Ray的配置
 
warp代理模式会在本地启动一个 sock5 代理`127.0.0.1:40000`，修改 V2Ray 的配置让出站流量走这个代理

找到 `conf.json` 中类似如下的内容

```
"outbounds": [
    {
      "protocol": "freedom",
      "settings": {}
    },
    {
      "protocol": "blackhole",
      "settings": {},
      "tag": "blocked"
    }
],
```
将 `freedom` 这一块修改为
```
{
  "protocol": "socks",
  "settings": {
    "servers": [
		{
		  "address": "127.0.0.1",
		  "port": 40000,
		  "users":[]
		}
	]}
}
                      
```

### 缺点

目前使用的 warp 程序启动的 sock5 代理貌似不支持 udp 协议，查了一些资料貌似有的版本支持有的版本不支持。 

如果想使用这个节点打外服的游戏，因为不支持 udp 协议，可能无法 NAT。

可以使用 V2Ray 的路由功能，只让 `openai.com` 之类的网站走 warp 代理，其他请求直接出站，应该可以解决 udp 不支持的问题。

### 加上了路由

把 `freedom` 加了回去
```
"outbounds": [
    {
      "protocol": "freedom",
      "settings": {}
	  "tag": "direct"
    },
	{
	  "protocol": "socks",
	  "settings": {
		"servers": [
			{
			  "address": "127.0.0.1",
			  "port": 40000,
			  "users":[]
			}
		]},
	  "tag": "socks"
	},
    {
      "protocol": "blackhole",
      "settings": {},
      "tag": "blocked"
    }
],
```

在路由配置 `routing` 中的 `rules` 添加 

```
{
  "type": "field",
  "outboundTag": "socks",
  "domain": ["openai.com", "openai.org"]
}

```