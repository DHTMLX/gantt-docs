---
sidebar_label: eachSelectedTask
title: eachSelectedTask method
description: "遍历甘特图中所有被选中的任务"
---

# eachSelectedTask

### Description

@short: 遍历甘特图中所有被选中的任务

@signature: eachSelectedTask: (code: GanttCallback) =\> void

### Parameters

- `code` - (required) *function* - 一个将对每个被选中任务执行的函数。该函数接收任务ID作为参数

### Example

~~~jsx
gantt.batchUpdate(function () {
    gantt.eachSelectedTask(function(task_id){
        if(gantt.isTaskExists(task_id))
            gantt.deleteTask(task_id);
    });
});
~~~

### Related samples
- [Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

### Details

:::note
 此方法是 **multiselect** 扩展的一部分，因此请确保启用 [multiselect](guides/extensions-list.md#duorenwuxuanze) 插件。更多详情请参阅 [多任务选择](guides/multiselection.md) 文章。 
:::

### Related API
- [eachTask](api/method/eachtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)
- [batchUpdate](api/method/batchupdate.md)

### Related Guides
- [多任务选择](guides/multiselection.md)

