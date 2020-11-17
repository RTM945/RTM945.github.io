---
layout: post
title: 通过Mybatis Mapper将JSON格式的ResulstSet转为Java对象
tags: 
- Java
- Mybatis
---  

标题看上去很复杂，实际情况如下：
- 公司项目使用Mybatis做ORM，但数据库不能在本地访问，无论是线上库还是测试库
- 只能通过Archery平台访问，只能进行查询操作
- 查询操作的结果集可以导出JSON/CSV等
- 对于Join查询，导出的结果也是纯粹的ResultSet"拉平"的形式，没有一对多的关系

因为数据库无法在本地访问，遇到一些bug时，很难去复现排查。    
因为导出Join查询的JSON是没有一对多关系的，需要自己去做映射，更是麻烦。    
但结果集的映射关系，在Mybatis Mapper中已经被定义好了，有没有方法可以复用Mybatis的映射方法呢？   
于是查看Mybatis的文档和源码，在[plugins](https://mybatis.org/mybatis-3/configuration.html#plugins)这一节大致可以了解到，Mybatis对结果集的处理是在`ResultSetHandler.handleResultSets`方法中，写了个程序打断点验证了一下果然如此。    
但`ResultSetHandler.handleResultSets`方法需要的参数是`Statement`，需要`Statement`因为需要从中拿到`ResultSet`，如果可以从JSON得到`ResultSet`，就可以复用Mybatis的Mapper映射。    
核心问题变成了从JSON得到`ResultSet`，没啥思路于是去爆栈网[问了一下](https://stackoverflow.com/questions/64854334/is-there-anyway-to-convert-json-to-java-bean-through-mybatis-mapper)，没什么建议。    
万能的群友404大佬发现，JOOQ可以从JSON/CSV/TXT得到`ResultSet`，那么问题就迎刃而解了。
{% highlight java %}
String json = ... // json;
DSLContext dsl = DSL.using(SQLDialect.MYSQL);
Result<?> result = dsl.fetchFromJSON(json);
ResultSet rs = result.intoResultSet();

// mybaits Configuration
Configuration dummyConfiguration = new Configuration();
dummyConfiguration.addMappers("org.example.mybatis.mapper");
MappedStatement ms = dummyConfiguration.getMappedStatement("getUserById");

// just copy mybaits DefaultResultSetHandler and remove some code
FakeResultSetHandler resultHandler = new FakeResultSetHandler(ms, null, RowBounds.DEFAULT);
List<Object> list = resultHandler.handleResultSets(rs);
System.out.println(list);
{% endhighlight %}

这里将`DefaultResultSetHandler`复制了出来，删掉了一些不需要的依赖和一些Nested Query的逻辑。    

[完整代码](https://github.com/RTM945/CodeSnippets/blob/master/java/test/src/main/java/mybatis/Main.java)

接下来，在排查bug时就一马平川了：
1. 通过日志拿出请求参数，从mapper.xml中找到selectId拼接出当时查询的SQL
2. 模拟http请求，从Archery平台得到结果集
3. 通过上面的方法转换出Java对象
4. 通过mockito等mock出mapper查询结果传给对应的service
