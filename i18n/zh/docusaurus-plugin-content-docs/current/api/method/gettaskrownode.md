---
sidebar_label: getTaskRowNode
title: getTaskRowNode 方法
description: "返回表格中任务行的 HTML 元素"
---

# getTaskRowNode

### Description

@short: 返回表格中任务行的 HTML 元素

@signature: getTaskRowNode: (id: string | number) =\> HTMLElement

### Parameters

- `id` - (required) *string | number* -    任务 id

### Returns
- `node` - (HTMLElement) - 该任务行的 HTML 元素

### Example

~~~jsx
const taskId = gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2023",
    duration:28
}, "project_2");

gantt.getTaskRowNode(10);//-><div class=​"gantt_row" task_id=​"2">​…​</div>​
~~~

### Details

请注意，当任务重新绘制时，旧的 DOM 元素将被丢弃并由新元素替换。这意味着对该元素所做的任何修改，在下一次重绘后将被重置。

如果需要修改元素的外观，我们建议使用模板，因为它们是自定义甘特图元素外观的首选方法。

### Related API
- [getTaskNode](api/method/gettasknode.md)
- [getTask](api/method/gettask.md)
- [task_text](api/template/task_text.md)
- [task_class](api/template/task_class.md)
- [grid_row_class](api/template/grid_row_class.md)

### Related Guides
- [Specifying Columns](guides/specifying-columns.md#datamappingandtemplates)