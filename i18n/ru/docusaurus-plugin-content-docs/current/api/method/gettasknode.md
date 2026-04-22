---
sidebar_label: getTaskNode
title: метод getTaskNode
description: "возвращает HTML-элемент панели задачи"
---

# getTaskNode

### Description

@short: Возвращает HTML-элемент панели задачи

@signature: getTaskNode: (id: string | number) =\> HTMLElement

### Parameters

- `id` - (required) *string | number* - идентификатор задачи

### Returns
- `node` - (HTMLElement) - HTML-элемент панели задачи

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

Please note that when a task is repainted, the old DOM element will be discarded and replaced by a new element. This means that any changes you make to the element will be reset after the next repaint.

If you need to modify the appearance of an element, we recommend using templates as they are the preferred method for customizing the look of Gantt elements.

### Related API
- [getTaskRowNode](api/method/gettaskrownode.md)
- [getTask](api/method/gettask.md)
- [task_text](api/template/task_text.md)
- [task_class](api/template/task_class.md)
- [grid_row_class](api/template/grid_row_class.md)