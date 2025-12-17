---
sidebar_label: changeTaskId
title: changeTaskId method
description: "aktualisiert die ID der Aufgabe"
---

# changeTaskId

### Description

@short: Aktualisiert die ID der Aufgabe

@signature: changeTaskId: (id: string | number, new_id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -    die aktuelle ID der Aufgabe
- `new_id` - (required) *string | number* -     die neue ID der Aufgabe

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2013",
    duration:28
}, "project_2");

gantt.changeTaskId(10, 15); //aktualisiert die ID der Aufgabe von '10' auf '15' /*!*/
~~~

### Details

Diese Methode löst das Event [onTaskIdChange](api/event/ontaskidchange.md) aus.

### Related API
- [onTaskIdChange](api/event/ontaskidchange.md)
- [changeLinkId](api/method/changelinkid.md)

