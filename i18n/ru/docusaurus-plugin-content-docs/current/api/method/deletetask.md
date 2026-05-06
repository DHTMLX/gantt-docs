---
sidebar_label: deleteTask
title: deleteTask method
description: "удаляет указанную задачу"
---

# deleteTask

### Description

@short: Удаляет указанную задачу

@signature: deleteTask: (id: string | number) =\> void

### Parameters

- `id` - (обязателен) *string | number* - идентификатор задачи

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Project #1",
    start_date:"02-09-2013",
    duration:28
});

gantt.deleteTask(10); /*!*/
~~~

### Details

Метод вызывает события [onBeforeTaskDelete](api/event/onbeforetaskdelete.md) и [onAfterTaskDelete](api/event/onaftertaskdelete.md).

### Related API
- [addTask](api/method/addtask.md)
- [deleteLink](api/method/deletelink.md)

### Related Guides
- [Основные операции с задачами](guides/crud-task.md)