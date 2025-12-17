---
sidebar_label: getTaskNode
title: getTaskNode method
description: "получает HTML-элемент, соответствующий полосе задачи"
---

# getTaskNode

### Description

@short: Получает HTML-элемент, соответствующий полосе задачи

@signature: getTaskNode: (id: string | number) =\> HTMLElement

### Parameters

- `id` - (required) *string | number* -    идентификатор задачи

### Returns
- `node` - (HTMLElement) - HTML-элемент, представляющий полосу задачи

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

Учтите, что при каждом перерисовывании задачи предыдущий DOM-элемент удаляется и заменяется новым. Это означает, что любые прямые изменения элемента будут потеряны после следующего обновления.

Для настройки внешнего вида элементов лучше использовать шаблоны, так как они обеспечивают надежный способ изменения отображения компонентов Gantt.

### Related API
- [getTaskRowNode](api/method/gettaskrownode.md)
- [getTask](api/method/gettask.md)
- [task_text](api/template/task_text.md)
- [task_class](api/template/task_class.md)
- [grid_row_class](api/template/grid_row_class.md)

