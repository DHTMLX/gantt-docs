---
title: "排序列"
sidebar_label: "排序列"
---

# 排序列

dhtmlxGantt 提供了在客户端对网格列中的数据进行排序的功能。


在网格中启用排序有两种方式:

1. 点击带有 [sort](api/config/sort.md) 属性的列头一次；
2. 使用 [sort](api/method/sort.md) 方法的 API 调用，此方法可以通过事件或操作（如按钮点击或页面加载时）触发。

:::note
请注意，Gantt 仅根据实际数据值对任务排序，不会对由列的 template 属性生成的值进行排序。
:::

## 通过点击表头进行排序

当点击表头时，Gantt 图会显示一个可视化指示器，突出显示当前排序的列以及排序顺序（升序或降序）。每次再次点击同一个表头会切换排序方向。

![gantt_sorting](/img/gantt_sorting.png)

要在 Gantt 图中启用排序功能，需要将 [sort](api/config/sort.md) 属性设置为 *true*:

~~~js
gantt.config.sort = true; 
gantt.init("gantt_here");
~~~


[Built-in sorting](https://docs.dhtmlx.com/gantt/samples/07_grid/01_builtin_sorting.html)


## 通过编程方式排序

如果需要基于某个事件或操作（如点击按钮或页面加载时）对网格进行排序，可以使用 [sort](api/method/sort.md) 方法。

**按钮点击时排序**
~~~html
<input type='button' value='Sort by task name' onclick='gantt.sort("text", true);'>

<script type="text/javascript" charset="utf-8">
    gantt.init("gantt_here"); 
    gantt.parse(tasks);
</script>
~~~


[Using sorting methods](https://docs.dhtmlx.com/gantt/samples/07_grid/05_sort_api.html)


## 自定义排序函数

可以通过将自定义函数的名称作为 [sort](api/method/sort.md) 方法的第一个（也是唯一一个）参数，实现自定义排序功能。

该函数会针对每一对相邻的值调用，并应返回 1、-1 或 0:

- **1** - 第一对象排在第二对象之前；
- **-1** - 第二对象排在第一对象之前；
- **0** - 两个对象的顺序保持不变。

**使用自定义函数对 Gantt 图进行排序**
~~~html
<input type='button' value='Sort by the number of holders' 
       onclick='sortByHolders(direction)'>

<script type="text/javascript" charset="utf-8">
    var direction = false;

    function sortByHolders(direction1){
        direction = !direction;
        gantt.sort(sortHolders);
    };
    function sortHolders(a,b){
         a = a.users.length;
         b = b.users.length;

         if (direction){
            return a>b?1:(a<b?-1:0);
         } else {
            return a>b?-1:(a<b?1:0);
         }
    };
</script>
~~~


[Custom sorting function](https://docs.dhtmlx.com/gantt/samples/07_grid/04_custom_sorting.html)


## 按列单独设置排序规则

可以为每一列单独定义自定义排序规则。以下是三种常见的按列排序处理方式:

1) 通过将 *sort* 设置为 false 禁用某一列的排序

~~~js
gantt.config.columns[1].sort = false;
~~~

2) 通过将 *sort* 设置为自定义函数，对某一列进行自定义排序

~~~js
gantt.config.columns[1].sort = function(a,b){
    return custom_function(a,b);
};
~~~

该自定义函数接收两个任务对象（a 和 b），并返回 1、-1 或 0:

- **1** - 第一个对象排在第二个对象之前；
- **-1** - 第二个对象排在第一个对象之前；
- **0** - 顺序不变。

3) 通过将 *sort* 设置为其他任务字段名，基于该字段值对某一列排序

~~~js
gantt.config.columns[1].sort = 'other_field';
~~~

