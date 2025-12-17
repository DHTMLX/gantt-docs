---
sidebar_label: getTaskRowNode
title: getTaskRowNode method
description: "返回表示表格中任务行的HTML元素"
---

# getTaskRowNode

### Description

@short: 返回表示表格中任务行的HTML元素

@signature: getTaskRowNode: (id: string | number) =\> HTMLElement

### Parameters

- `id` - (required) *string | number* -    任务ID

### Returns
- `node` - (HTMLElement) - 对应任务行的HTML元素

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

请注意，当任务被更新并重新渲染时，之前的DOM元素会被丢弃并替换为新的元素。因此，任何直接对该元素所做的修改都会在下一次重绘后丢失。

为了自定义元素的外观，最好使用模板（template），因为这是调整甘特图组件外观的推荐方式。

### Related API
- [getTaskNode](api/method/gettasknode.md)
- [getTask](api/method/gettask.md)
- [task_text](api/template/task_text.md)
- [task_class](api/template/task_class.md)
- [grid_row_class](api/template/grid_row_class.md)

### Related Guides
- [指定列](guides/specifying-columns.md)

