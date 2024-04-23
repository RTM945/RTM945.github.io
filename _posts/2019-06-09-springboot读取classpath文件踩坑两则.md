---
layout: post
title: SpringBoot读取classpath文件踩坑两则
tags: 
- Java
- SpringBoot
---

遇到了一个获取不到springboot classpath下的文件的问题，无论是自定义的配置文件，还是class文件，记录一下解决用的代码  

## 读取classpath下的某文件夹下的json文件
{% highlight java %}
ClassLoader cl = this.getClass().getClassLoader();
ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver(cl);
Resource[] resources = resolver.getResources("classpath:json/*.json");

for (Resource resource : resources) {
    InputStream inputStream = resource.getInputStream();//使用resource.getFile()可能为null
}
{% endhighlight %}

## 反射读取classpath下的某个package的class
{% highlight java %}
//Guava方式
ClassLoader loader = Thread.currentThread().getContextClassLoader();
for(ClassPath.ClassInfo info : ClassPath.from(classLoader).getTopLevelClasses(packageName)) {
    Class<?> clz = info.load();
}
{% endhighlight %}
## Guava ClassInfo类获取不到时的另一种方式
{% highlight java %}
//如果Guava ClassInfo类取不到
ClassLoader loader = Thread.currentThread().getContextClassLoader();
MetadataReaderFactory metadataReaderFactory = new CachingMetadataReaderFactory(classLoader);
ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver(loader);
String pattern = ResourcePatternResolver.CLASSPATH_ALL_URL_PREFIX + ClassUtils.convertClassNameToResourcePath(packageName) + "/**/*.class";
Resource[] resources = resolver.getResources(pattern);
for (Resource resource : resources) {
    MetadataReader reader = readerFactory.getMetadataReader(resource);
    Class<?> clz = ClassUtils.forName(reader.getClassMetadata().getClassName(), loader);
}
{% endhighlight %}
参考[springboot源码](https://github.com/spring-projects/spring-boot/blob/master/spring-boot-project/spring-boot/src/main/java/org/springframework/boot/liquibase/SpringPackageScanClassResolver.java)

--- 

## 2024-04-23 update 
上述方法只能获取lib中的package下的class, 如果项目本体中有包名相同的则无法获取. (如果包名相同类目也相同, 本体的class会覆盖lib中的, 这个特性有时候很有用) 

Guava 获取所有class 找特定package下的class
{% highlight java %}
Set<? extends Class<?>> collect = ClassPath.from(ClassLoader.getSystemClassLoader())
      .getAllClasses()
      .stream()
      .filter(clazz -> clazz.getPackageName()
        .equalsIgnoreCase(packageName))
      .map(clazz -> clazz.load())
      .collect(Collectors.toSet());
{% endhighlight java %}
有时候有需求将class实例化, 但有些class是抽象类等无法被实例化的类, 挨个儿做好try catch即可
