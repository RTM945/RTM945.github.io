---
layout: post
title: 非Spring方式配置Mybatis
tags: 
- Java
- Mybatis
---

{% highlight java %}
public enum DBContext {
	
	INSTANCE;
	
	private HikariDataSource ds;
	private SqlSessionFactory sqlSessionFactory;
	
	public static void init(String hikariProperties, String mapperLocation, String aliasPackage) {
		INSTANCE.ds = new HikariDataSource(new HikariConfig("conf/hikari.properties"));
		TransactionFactory transactionFactory = new JdbcTransactionFactory();
		Environment environment = new Environment("<dsname>", transactionFactory, INSTANCE.ds);
		Configuration conf = new Configuration(environment);
		conf.getTypeAliasRegistry().registerAliases(aliasPackage);
//		configuration.addMappers(mapperPackage);
		File mappersFile = new File(mapperLocation);
		File[] mappers = mappersFile.listFiles(new FileFilter() {
			
			@Override
			public boolean accept(File pathname) {
				return pathname.getName().endsWith("Mapper.xml");
			}
		});
		
		for (int i = 0; i < mappers.length; i++) {
			try {
				FileInputStream is = new FileInputStream(mappers[i]);
				XMLMapperBuilder xmlMapperBuilder = new XMLMapperBuilder(is, conf, mappers[i].getAbsolutePath(), conf.getSqlFragments());
				xmlMapperBuilder.parse();
				is.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		INSTANCE.sqlSessionFactory = new SqlSessionFactoryBuilder().build(conf);
	}
	
	public static SqlSessionFactory getSqlSessionFactory() {
		return INSTANCE.sqlSessionFactory;
	}
	
	public static void destroy() {
		INSTANCE.ds.close();
	}

}
{% endhighlight %}
Alias实体类要加上Alias注解  
`SqlSessionFactory opensession`使用mybaties自带的`JdbcTransactionFactory`的话，是打开事务的，操作结束后不提交，改动会回滚，如果不想用事务，要`opensession(true)`