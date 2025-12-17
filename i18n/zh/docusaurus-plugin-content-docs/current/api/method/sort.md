---
sidebar_label: sort
title: sort method
description: "在grid中对任务进行排序"
---

# sort

### Description

@short: 在grid中对任务进行排序

@signature: sort: (field: string | ((task1: Task, task2: Task) => 1 | 0 | -1), desc?: boolean, parent?: string | number, silent?: boolean) =\> void

### Parameters

- `field` - (required) *string | SortTasks* -        用于排序grid的列名，或自定义排序函数
- `desc` - (optional) *boolean* - 设置排序顺序:<i>true</i>表示降序，<i>false</i>表示升序<br>，默认值为<i>false</i>
- `parent` - (optional) *string | number* - 父任务的ID。如果只想对指定父任务分支内的任务进行排序，请使用此参数。
- `silent` - (optional) *boolean* - 决定在重新排序项目后是否触发渲染

### Example

~~~jsx
<input type='button'  value='按任务名称排序' onclick='sortByName()'>
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
- [Using sorting methods](https://docs.dhtmlx.com/gantt/samples/07_grid/05_sort_api.html)

### Details

自定义排序函数接收**Task**对象作为参数，应该返回一个数字（1、0或-1）。

使用自定义排序函数时，**parent**参数会被忽略。[查看示例](https://snippet.dhtmlx.com/d8li6kq2)。

调用**sort()**方法时，Gantt不会自动添加任何排序图标（例如表示排序方向的箭头）。如果需要显示排序图标，可以手动添加。[查看示例](https://snippet.dhtmlx.com/5bjavofk)。

### Related API
- [sort](api/config/sort.md)
- [onAfterSort](api/event/onaftersort.md)

### Related Guides
- [排序列](guides/sorting.md)

