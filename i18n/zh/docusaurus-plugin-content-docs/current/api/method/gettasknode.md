---
sidebar_label: getTaskNode
title: getTaskNode 方法
description: "返回任务栏的 HTML 元素"
---

# getTaskNode

### Description

@short: 返回任务栏的 HTML 元素

@signature: getTaskNode: (id: string | number) =\> HTMLElement

### Parameters

- `id` - (required) *string | number* - 任务 ID

### Returns
- `node` - (HTMLElement) - 任务栏的 HTML 元素

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

gantt.getTaskNode(10);//-><div task_id=​"2" class=​"gantt_task_line" ​…​​>​​…​</div>​
~~~

### Details

请注意，当任务被重新绘制时，旧的 DOM 元素将被丢弃并由新元素替换。这意味着您对该元素所做的任何修改将在下次重绘后被重置。

如果需要修改元素的外观，我们建议使用模板，因为它们是自定义 Gantt 元素外观的首选方法。

### Related API
- [getTaskRowNode](api/method/gettaskrownode.md)
- [getTask](api/method/gettask.md)
- [task_text](api/template/task_text.md)
- [task_class](api/template/task_class.md)
- [grid_row_class](api/template/grid_row_class.md)