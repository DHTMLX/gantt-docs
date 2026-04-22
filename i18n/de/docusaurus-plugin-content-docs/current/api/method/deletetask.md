---
sidebar_label: deleteTask
title: deleteTask method
description: "löscht die angegebene Aufgabe"
---

# deleteTask

### Description

@short: Löscht die angegebene Aufgabe

@signature: deleteTask: (id: string | number) =\> void

### Parameters

- `id` - (erforderlich) *string | number* -    die ID der Aufgabe

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

Die Methode ruft die Ereignisse [onBeforeTaskDelete](api/event/onbeforetaskdelete.md) und [onAfterTaskDelete](api/event/onaftertaskdelete.md) auf.

### Related API
- [addTask](api/method/addtask.md)
- [deleteLink](api/method/deletelink.md)

### Related Guides
- [Basic Operations with Tasks](guides/crud-task.md)