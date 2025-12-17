---
sidebar_label: getTaskRowNode
title: getTaskRowNode method
description: "returns the HTML element of the task row in the table"
---

# getTaskRowNode

### Description

@short: Returns the HTML element of the task row in the table

@signature: getTaskRowNode: (id: string | number) =\> HTMLElement

### Parameters

- `id` - (required) *string | number* -    the task id

### Returns
- `node` - (HTMLElement) - the HTML element of the task row

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

Please note that when a task is repainted, the old DOM element will be discarded and replaced by a new element. This means that any changes you make to the element will be reset after the next repaint.

If you need to modify the appearance of an element, we recommend using templates as they are the preferred method for customizing the look of Gantt elements.

### Related API
- [getTaskNode](api/method/gettasknode.md)
- [getTask](api/method/gettask.md)
- [task_text](api/template/task_text.md)
- [task_class](api/template/task_class.md)
- [grid_row_class](api/template/grid_row_class.md)

### Related Guides
- [Specifying Columns](guides/specifying-columns.md#datamappingandtemplates)

