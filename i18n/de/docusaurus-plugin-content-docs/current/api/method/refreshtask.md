---
sidebar_label: refreshTask
title: refreshTask Methode
description: "aktualisiert die Aufgabe und ihre zugehörigen Links"
---

# refreshTask

### Description

@short: Aktualisiert die Aufgabe und ihre zugehörigen Links

@signature: refreshTask: (id: string | number, refresh_links?: boolean) =\> void

### Parameters

- `id` - (erforderlich) *string | number* - die Aufgaben-ID

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

var task = gantt.getTask(10);

task.text = "Task #10"; /*!*/
gantt.refreshTask(10);       /*!*/
~~~

### Details

Sie können diese Methode verwenden, um eine Aufgabe nach dem Ändern ihrer Eigenschaften neu zu zeichnen. Im Gegensatz zu [updateTask](api/method/updatetask.md) löst diese Methode den [DataProcessor](guides/server-side.md) nicht aus, und es werden keine Updates an den Server gesendet.

### Related API
- [refreshLink](api/method/refreshlink.md)
- [refreshData](api/method/refreshdata.md)
- [updateTask](api/method/updatetask.md)
- [updateLink](api/method/updatelink.md)

### Related Guides
- [Basic Operations with Tasks](guides/crud-task.md)