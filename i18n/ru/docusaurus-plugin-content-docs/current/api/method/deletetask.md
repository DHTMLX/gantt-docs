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

- `id` - (required) *string | number* -    идентификатор задачи, которую необходимо удалить

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

Этот метод вызывает события [onBeforeTaskDelete](api/event/onbeforetaskdelete.md) и [onAfterTaskDelete](api/event/onaftertaskdelete.md).

### Related API
- [addTask](api/method/addtask.md)
- [deleteLink](api/method/deletelink.md)

### Related Guides
- [Базовые операции с задачами](guides/crud-task.md)

