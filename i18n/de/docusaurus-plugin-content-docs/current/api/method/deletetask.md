---
sidebar_label: deleteTask
title: deleteTask method
description: "entfernt die angegebene Aufgabe"
---

# deleteTask

### Description

@short: Entfernt die angegebene Aufgabe

@signature: deleteTask: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -     die ID der zu entfernenden Aufgabe

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

Diese Methode löst die Events [onBeforeTaskDelete](api/event/onbeforetaskdelete.md) und [onAfterTaskDelete](api/event/onaftertaskdelete.md) aus.

### Related API
- [addTask](api/method/addtask.md)
- [deleteLink](api/method/deletelink.md)

### Related Guides
- ["Grundlegende Operationen mit Aufgaben"](guides/crud-task.md)

