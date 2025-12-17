---
sidebar_label: refreshTask
title: refreshTask method
description: "aktualisiert die Aufgabe und ihre zugehörigen Links"
---

# refreshTask

### Description

@short: Aktualisiert die Aufgabe und ihre zugehörigen Links

@signature: refreshTask: (id: string | number, refresh_links?: boolean) =\> void

### Parameters

- `id` - (required) *string | number* - die Aufgaben-ID
- `irefresh_linksd` - (optional) *boolean* - bestimmt, ob die zugehörigen Links der Aufgabe aktualisiert werden sollen, standardmäßig true

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

Diese Methode kann verwendet werden, um eine Aufgabe nach der Änderung ihrer Eigenschaften neu zu zeichnen. Im Gegensatz zu [updateTask](api/method/updatetask.md) löst sie keinen [DataProcessor](guides/server-side.md) aus, daher werden keine Aktualisierungen an den Server gesendet.

### Related API
- [refreshLink](api/method/refreshlink.md)
- [refreshData](api/method/refreshdata.md)
- [updateTask](api/method/updatetask.md)
- [updateLink](api/method/updatelink.md)

### Related Guides
- ["Grundlegende Operationen mit Aufgaben"](guides/crud-task.md)

