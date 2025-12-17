---
sidebar_label: changeTaskId
title: changeTaskId method
description: "обновляет id задачи"
---

# changeTaskId

### Description

@short: Обновляет id задачи

@signature: changeTaskId: (id: string | number, new_id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    текущий id задачи
- `new_id` - (required) *string | number* -     новый id задачи

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

gantt.changeTaskId(10, 15); //обновляет id задачи с '10' на '15' /*!*/
~~~

### Details

Этот метод вызывает событие [onTaskIdChange](api/event/ontaskidchange.md).

### Related API
- [onTaskIdChange](api/event/ontaskidchange.md)
- [changeLinkId](api/method/changelinkid.md)

