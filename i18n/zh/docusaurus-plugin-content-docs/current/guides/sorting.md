---
title: "列排序"
sidebar_label: "列排序"
---

# 列排序

dhtmlxGantt 允许您在网格的列中对数据进行排序（在客户端完成）。

有两种方式可以在网格中提供排序：

1. 通过在启用 [sort](api/config/sort.md) 属性的列头上单击一次；
2. 通过对 [sort](api/method/sort.md) 方法的 API 调用（可以在某些事件或操作中调用，例如按钮点击或页面加载）来实现排序。

:::note
请注意，Gantt 只能按数据中的值对任务进行排序，而不会按列的模板属性设置的值进行排序。
:::

## 通过单击列头进行排序

一旦用户单击列头，Gantt 图表将显示一个特殊控件，指示当前按哪个列进行排序以及排序方向（升序或降序）。
再次点击同一列头将反转排序方向。

![gantt_sorting](/img/gantt_sorting.png)

要在 Gantt 图表中启用排序，请将 [sort](api/config/sort.md) 属性设置为 *true*：

~~~js
gantt.config.sort = true; 
gantt.init("gantt_here");
~~~


[内置排序](https://docs.dhtmlx.com/gantt/samples/07_grid/01_builtin_sorting.html)


## 编程排序

要在某个动作或事件（例如按钮点击或页面加载）对网格进行排序，请调用 [sort](api/method/sort.md) 方法。

**按钮点击时排序**
~~~html
<input type='button' value='Sort by task name' onclick='gantt.sort("text", true);'>

<script type="text/javascript" charset="utf-8">
    gantt.init("gantt_here"); 
    gantt.parse(tasks);
</script>
~~~


[使用排序方法](https://docs.dhtmlx.com/gantt/samples/07_grid/05_sort_api.html)


## 自定义排序函数

要将自定义排序函数应用于网格，请在调用 [sort](api/method/sort.md) 方法时，将自定义函数的名称作为第一个（且唯一）参数传入。

自定义排序函数会针对每对相邻的值进行调用，并返回 1、-1 或 0：

- **1** - 对成对中第一个值的对象必须排在第二个之前；
- **-1** - 第二个对象排在第一个对象之前；
- **0** - 两个对象的顺序不变。


**使用自定义函数对 Gantt 图表进行排序**
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


[自定义排序函数](https://docs.dhtmlx.com/gantt/samples/07_grid/04_custom_sorting.html)


## 每列网格排序 {#percolumngridsorting}

可以为每一列指定自定义排序规则。每列最常见的三种排序情景如下：

1) 将 *sort* 设置为 false 以禁用某列的排序

~~~js
gantt.config.columns[1].sort = false;
~~~

2) 将 *sort* 设置为一个函数 based on the provided sorting functions，使某列按该函数进行排序

~~~js
gantt.config.columns[1].sort = function(a,b){
    return custom_function(a,b);
};
~~~

自定义排序函数对一对任务对象（a 和 b）进行调用并返回 1、-1 或 0：


- **1** - 对成对中第一个值的对象必须排在第二个之前；
- **-1** - 第二个对象排在第一个对象之前；
- **0** - 两个对象的顺序不变。


3) 将 *sort* 设置为任务的另一字段名，以按该字段的值对列进行排序 

~~~js
gantt.config.columns[1].sort = 'other_field';
~~~


## 按多个字段排序

您可以使用自定义排序函数按多个属性（字段）对 Gantt 图表的网格进行排序。
在下面的示例中，数据按 *duration* 和 *priority* 字段排序：

~~~js
let sortDirection = -1
function customSort() {
    sortDirection *= -1;
    gantt.sort(function (task1, task2) {
        // 按 priority 排序
        if (task1.duration == task2.duration) {
            return (task1.priority - task2.priority) * sortDirection
        }
        // 按 duration 排序
        return (task1.duration - task2.duration) * sortDirection
    });
}
~~~

[按多个属性（字段）使用自定义排序函数排序](https://snippet.dhtmlx.com/upu86azw)

- 当任务的 duration 相同时时，按该字段排序不会生效，任务将按 *priority* 字段排序。 
- 如果任务的 duration 不同，网格将按 *duration* 属性排序。