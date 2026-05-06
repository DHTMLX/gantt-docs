---
sidebar_label: getTaskRowNode
title: метод getTaskRowNode
description: "возвращает HTML-элемент строки задачи в таблице"
---

# getTaskRowNode

### Description

@short: Returns the HTML element of the task row in the table

@signature: getTaskRowNode: (id: string | number) => HTMLElement

### Parameters

- `id` - (required) *string | number* - идентификатор задачи

### Returns
- `node` - (HTMLElement) - HTML-элемент строки задачи

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

Обратите внимание: при повторной перерисовке задачи старый DOM-элемент будет удалён и заменён новым элементом. Это означает, что любые изменения, которые вы вносите в элемент, будут сброшены после следующей перерисовки.

Если вам нужно изменить внешний вид элемента, рекомендуется использовать шаблоны, ведь они являются предпочтительным способом настройки внешнего вида элементов Gantt.

### Related API
- [getTaskNode](api/method/gettasknode.md)
- [getTask](api/method/gettask.md)
- [task_text](api/template/task_text.md)
- [task_class](api/template/task_class.md)
- [grid_row_class](api/template/grid_row_class.md)

### Related Guides
- [Specifying Columns](guides/specifying-columns.md#datamappingandtemplates)