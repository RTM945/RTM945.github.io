---
layout: post
title: Java Stream 备忘
tags: 
- Java
---

公司的项目中大量用到了`Stream`API，或者说，能用到`Stream`的地方都用了，写的人固然很爽，但有时维护的人还是会骂街。    
骂归骂，自己爽比较重要。   
于是记录了一些`Stream`用法防止忘记，基础的`forEach/filter/map`用法就略过了。    
以后遇到有意思的`Stream`用法，也会记录在这里。    

---
 
## Java Stream
### flatMap
经常会迷惑`map`和`flatMap`区别是啥，我也说不好，直接上代码吧。    
它可以用在类似`Map<K, List<T>>`的结构中(或者说`MultiMap`)，用与操作所有集合的元素。    
使用听不懂的说法，它将`Stream<Collection<T>>`"拉平"成`Stream<T>`。   
注：为了简化基础集合类型的初始化，使用了`Guava`API。    

{% highlight java %}
Map<String, List<Integer>> map = new HashMap<>();
map.put("a", Lists.newArrayList(1, 2, 3));
map.put("b", Lists.newArrayList(4, 5, 6));
// want [1, 2, 3, 4, 5, 6]
map.values()
    .stream()
    .flatMap(Collection::stream)
    .collect(Collectors.toList());
{% endhighlight %}

---

### convert List to Map
将`List`转为`Map`，约定`Map`中每个`key`对应的`value`都是唯一的。  
{% highlight java %}
List<String> list = Lists.newArrayList("Aabc", "Bdef", "Cghi");
// want {A: abc, B:def, C:ghi}
Map<String, String> map = list
    .stream()
    .collect(
        Collectors.toMap(
            item -> item.substring(0, 1), 
            item -> item.substring(1)
        )
    );
{% endhighlight %}

--- 

### convert List to MultiMap
上述的转换当`key`对应的`value`并非唯一时，可能希望转换成`Map<K, List<T>>/MultiMap`的形式。    
{% highlight java %}
List<String> list = Lists.newArrayList("Aabc", "Adef", "Bghi");
// want {A: [abc, def], B:[ghi]}
Map<String, List<String>> map = list
    .stream()
    .collect(
        Collectors.toMap(
            item -> item.substring(0, 1), 
            item -> Lists.newArrayList(item.substring(1)), 
            // key 冲突时，两个value的处理
            (oldVal, newVal) -> {
                oldVal.addAll(newVal);
                return newVal;
            }
        )
    );
{% endhighlight %}

---

### multiMap transform
想改变`MultiMap`中`Entry`的类型。
{% highlight java %}
Map<String, List<String>> map = new HashMap<>();
map.put("a", Lists.newArrayList("A", "B", "C"));
// want {A: [a, b, c]}
map = map.entrySet()
    .stream()
    .map(entry -> {
        String newKey = entry.getKey().toUpperCase();
        List<String> newVal = entry.getValue()
            .stream()
            .map(item -> item.toLowerCase())
            .collect(Collectors.toList());
        // or new AbstractMap.SimpleEntry<String, String>(newKey, newVal);
        return Maps.immutableEntry(newKey, newVal);
}).collect(Collectors.toMap(Entry::getKey, Entry::getValue));
{% endhighlight %}

---

## Guava Collection
`Guava`提供了很方便的集合类型和接口，下面用`Guava`再实现一下上面的操作。   

### flatMap
`Guava`直接提供了`MultiMap`类型。
{% highlight java %}
Multimap<String, Integer> multimap = ArrayListMultimap.create();
multimap.putAll("a", Lists.newArrayList(1, 2, 3));
multimap.putAll("b", Lists.newArrayList(4, 5, 6));
// want [1, 2, 3, 4, 5, 6]
List<Integer> list = multimap.values();
{% endhighlight %}

---

### convert list to map
这里的做法是分成两步骤：
1. 先将`key`提取出来；
2. 再将`value`转换成所需的格式。     

测试代码使用了`String`类型，实际使用中是对象的话，就可以将第二步省略，除非还要再转换对象。   
{% highlight java %}
List<String> list = Lists.newArrayList("Aabc", "Bdef", "Cghi");
// want {A: abc, B:def, C:ghi}
Map<String, String> map = Maps.uniqueIndex(list, item -> item.substring(0, 1));
map = Maps.transformValues(map, item -> item.substring(1));
{% endhighlight %}

---

### convert List to MultiMap
大致逻辑和使用`Stream`相同，只是返回类型变成了`MultiMap`。
{% highlight java %}
List<String> list = Lists.newArrayList("Aabc", "Adef", "Bghi");
// want {A: [abc, def], B:[ghi]}
Multimap<String, String> multimap = list
    .stream()
    .collect(ArrayListMultimap::create,
        (m, item) -> m.put(item.substring(0, 1), item.substring(1)), 
        Multimap::putAll);
{% endhighlight %}

---

### MultiMap transform
`Guava`不提供`transformKeys`的方法。   
[一个比较好的解释](https://stackoverflow.com/a/5733566/4276950)   
所以这里使用`Guava`只能对`value`进行转换。
{% highlight java %}
Multimap<String, String> multimap = ArrayListMultimap.create();
multimap.putAll("a", Lists.newArrayList("A", "B", "C"));
// want {A: [a, b, c]}
// but get {a: [a, b, c]}
multimap = Multimaps.transformValues(multimap, String::toLowerCase);
{% endhighlight %}

--- 

### transform a collection into a Guava Multimap grouped by the elements of a nested collection property    
这是在工作中遇到的一个转换，记录下来。
{% highlight java %}
/*
                            a -> foo1, foo3
foo1, tags=a,b,c            b -> foo1
foo2, tags=c,d     --->     c -> foo1, foo2, foo3
foo3, tags=a,c,e            d -> foo2
                            e -> foo3
*/
List<String> list = Lists.newArrayList(
    "foo1, tags=a,b,c",
    "foo2, tags=c,d",
    "foo3, tags=a,c,e"
);
ImmutableMultimap.Builder<String, String> builder = ImmutableMultimap.builder();
list.forEach(item -> {
    String[] arr = item.split(", ");
    String[] tags = arr[1].substring("tags=".length()).split(",");
    Arrays.stream(tags).forEach(tag -> builder.put(tag, arr[0]));
});
Multimap<String, String> multimap = builder.build();
{% endhighlight %}

一句话版本：

{% highlight java %}
Multimap<String, String> multimap = list
        .stream()
        .collect(
            ImmutableMultimap.Builder<String, String>::new,
            (builder, item) -> {
                String[] arr = item.split(", ");
                String[] tags = arr[1].substring("tags=".length()).split(",");
                Arrays.stream(tags).forEach(tag -> builder.put(tag, arr[0]));
            },
            (builder1, builder2) -> builder1.putAll(builder2.build())
        ).build();
{% endhighlight %}    

其实原理都和`List`转`MultiMap`一样：先提取出`key`，将`value`转为集合，当`key`冲突时，合并两个集合。

---

## 碎碎念
年轻的生命中突然出现`Stream`，玩法超多逼格又高，吸引码农们不好好写代码。    
学不动求不更。     
9月了，专升本这边一开学，估计正式要学位考了，这段时间会复习，力扣每日一题很遗憾只能断签。工作上也不乐观，写代码占20%时间，单元测试需要80%时间，每天的工作完不成，得加班了。   