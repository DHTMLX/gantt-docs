---
sidebar_label: sort
title: 排序方法
description: "在网格中对任务进行排序"
---

# sort

### Description

@short: 将网格中的任务排序

@signature: sort: (field: string | ((task1: Task, task2: Task) => 1 | 0 | -1), desc?: boolean, parent?: string | number, silent?: boolean) =\> void

### Parameters

- `field`	- (required) *string | SortTasks*	- 将要按照其排序的列名，或一个自定义排序函数
- `desc`	-	(optional) *boolean* - 指定排序方向：<i>true</i> 表示降序，<i>false</i> 表示升序。默认值为 <i>false</i>
- `parent` -	(optional) *string | number*	- 父任务的 ID。如果只想在指定父级的分支中排序任务，请指定该参数。
- `silent` -	(optional) *boolean*	- 指定重排序后是否应触发渲染

### Example

~~~jsx
<input type='button'  value='Sort by task name' onclick='sortByName()'>
<script>
    var n_direction = false;
    function sortByName(){
        if (n_direction){
            gantt.sort("text",false);
        } else {
            gantt.sort("text",true);
        }
        n_direction = !n_direction;
    };
    gantt.init("gantt_here");
</script>
~~~

### Related samples
- [使用排序方法](https://docs.dhtmlx.com/gantt/samples/07_grid/05_sort_api.html)

### Details

自定义排序函数将把 **Task** 对象作为参数传入，且应返回一个数字（1、0 或 -1）

**parent** 参数在应用排序的自定义函数时将被忽略。[查看示例](https://snippet.dhtmlx.com/d8li6kq2)。

当使用 **sort()** 方法时，Gantt 不会添加任何排序图标（显示排序方向的箭头）。如果需要渲染排序图标，可以手动添加。[查看示例](https://snippet.dhtmlx.com/5bjavofk)。

### Related API
- [sort](api/config/sort.md)
- [onAfterSort](api/event/onaftersort.md)

### Related Guides
- [排序列](guides/sorting.md)