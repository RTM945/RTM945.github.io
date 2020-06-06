---
layout: post
title: Lettuce调用lua脚本
tags: 
- Java
- Redis
---
### 一般使用 

{% highlight java %}
RedisClient redisClient = RedisClient.create("redis://localhost:6379/0");
StatefulRedisConnection<String, String> connection = redisClient.connect();
RedisCommands<String, String> syncCommands = connection.sync();
String loaded = syncCommands.scriptLoad("return 1+2");
Object result = syncCommands.evalsha(loaded, ScriptOutputType.INTEGER, new String[0], "");
{% endhighlight %}
`evalsha`方法对应redis的`EVALSHA`命令，根据给定的 sha1 校验码，执行缓存在服务器中的脚本 
 将脚本缓存到服务器的操作可以通过`scriptLoad`方法进行，对应redis的`SCRIPT LOAD`命令  

---

### 使用自定义`RedisCodec`时的问题  

Lettuce的connection对象是和```RedisCodec```挂钩的，默认使用的是```StringCodec.UTF8```，适用于key和value都是String的情况  
当使用自定义的```RedisCodec```时，比如[```SerializedObjectCodec```](https://github.com/RTM945/CodeSnippets/blob/master/java/RedisDance/src/main/java/me/rtmsoft/redisdance/base/SerializedObjectCodec.java)，在scriptLoadt时，也会调用自定义的```RedisCodec```，报错```ERR Error compiling script (new function): user_script:1: unexpected symbol near 'ﾬ'``` 
根据[#1090](https://github.com/lettuce-io/lettuce-core/issues/1090)，有两种解决办法：
1. Use a different connection for SCRIPT LOAD using a StringCodec.
2. Create a [custom command](https://github.com/lettuce-io/lettuce-core/wiki/Custom-commands,-outputs-and-command-mechanics) with an appropriate codec to load your script.  

第二种方法没有实践成功，故使用了[第一种方法](https://github.com/RTM945/CodeSnippets/blob/master/java/RedisDance/src/main/java/me/rtmsoft/redisdance/base/RedisOps.java#L66)  

--- 

根据[#1010](https://github.com/lettuce-io/lettuce-core/issues/1010)6.0版本后会修复这个问题，让`scriptLoad`方法默认使用`StringCodec` 