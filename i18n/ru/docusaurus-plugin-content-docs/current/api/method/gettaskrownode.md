---
sidebar_label: getTaskRowNode
title: getTaskRowNode method
description: "возвращает HTML-элемент, представляющий строку задачи в таблице"
---

# getTaskRowNode

### Description

@short: Возвращает HTML-элемент, представляющий строку задачи в таблице

@signature: getTaskRowNode: (id: string | number) =\> HTMLElement

### Parameters

- `id` - (required) *string | number* -    идентификатор задачи

### Returns
- `node` - (HTMLElement) - HTML-элемент, соответствующий строке задачи

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

Имейте в виду, что при обновлении и перерисовке задачи предыдущий DOM-элемент удаляется и заменяется новым. В результате любые изменения, внесённые напрямую в элемент, будут потеряны после следующей перерисовки.

Для кастомизации внешнего вида элементов рекомендуется использовать шаблоны, так как это рекомендуемый способ настройки внешнего вида компонентов Gantt.

### Related API
- [getTaskNode](api/method/gettasknode.md)
- [getTask](api/method/gettask.md)
- [task_text](api/template/task_text.md)
- [task_class](api/template/task_class.md)
- [grid_row_class](api/template/grid_row_class.md)

### Related Guides
- [Указание колонок](guides/specifying-columns.md#datamappingandtemplates)

