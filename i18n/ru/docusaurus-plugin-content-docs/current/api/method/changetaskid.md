---
sidebar_label: changeTaskId
title: changeTaskId method
description: "Изменяет идентификатор задачи"
---

# changeTaskId

### Description

@short: Изменяет идентификатор задачи

@signature: changeTaskId: (id: string | number, new_id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* - текущий идентификатор задачи
- `new_id` - (required) *string | number* - новый идентификатор задачи

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

gantt.changeTaskId(10, 15); //changes the task's id '10 -> 15' /*!*/
~~~

### Details

Метод вызывает событие [onTaskIdChange](api/event/ontaskidchange.md).

### Related API
- [onTaskIdChange](api/event/ontaskidchange.md)
- [changeLinkId](api/method/changelinkid.md)