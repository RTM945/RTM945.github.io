---
layout: post
title: mysql插入emoji时报错"Incorrect string value..."
tags: 
- Mysql
---

mysql update/insert 报错 `Incorrect string value: '\xF0\x9F...'`    
一眼就知道这个字符带emoji, 报错原因是编码问题   
众所周知, mysql的`utf8`编码不是真正的`utf8`, 真正的是`utf8mb4`    
打开表结构一看, 确实是`utf8mb4`没错    
mysql执行`show variables like '%character_set_%';`结果如下    
```
+--------------------------+------------+
| Variable_name            | Value      |
+--------------------------+------------+
| character_set_client     | utf8mb4    |
| character_set_connection | utf8mb4    |
| character_set_database   | utf8mb4    |
| character_set_filesystem | binary     |
| character_set_results    | utf8mb4    |
| character_set_server     | utf8       |
| character_set_system     | utf8       |
+--------------------------+------------+
```
看上去是`utf8`不是`utf8mb4`的两个需要改，但又不好去改数据库    
于是找到[charset相关的mysql文档](https://dev.mysql.com/doc/connector-j/8.0/en/connector-j-reference-charsets.html)看到NOTES部分   

> For Connector/J 8.0.12 and earlier: In order to use the utf8mb4 character set for the connection, the server MUST be configured with character_set_server=utf8mb4; if that is not the case, when UTF-8 is used for characterEncoding in the connection string, it will map to the MySQL character set name utf8, which is an alias for utf8mb3.

再一看我们用的connector版本为8.0.11    
于是将版本升级到最新，并且在jdbc url中加入参数`&characterEncoding=UTF-8`   
`UTF-8`会被映射成`utf8mb4`     
问题解决   
