---
sidebar_label: getTaskNode
title: getTaskNode method
description: "获取对应任务条的 HTML 元素"
---

# getTaskNode

### Description

@short: 获取对应任务条的 HTML 元素

@signature: getTaskNode: (id: string | number) =\> HTMLElement

### Parameters

- `id` - (required) *string | number* -    任务标识符

### Returns
- `node` - (HTMLElement) - 表示任务条的 HTML 元素

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

请注意，每当任务被重新绘制时，之前的 DOM 元素会被丢弃并替换为新的元素。这意味着对元素的任何直接修改都会在下一次更新后丢失。

为了自定义元素的外观，最好使用模板，因为模板提供了一种可靠的方式来调整甘特图组件的显示效果。

### Related API
- [getTaskRowNode](api/method/gettaskrownode.md)
- [getTask](api/method/gettask.md)
- [task_text](api/template/task_text.md)
- [task_class](api/template/task_class.md)
- [grid_row_class](api/template/grid_row_class.md)

