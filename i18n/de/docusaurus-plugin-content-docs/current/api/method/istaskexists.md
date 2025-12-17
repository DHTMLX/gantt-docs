---
sidebar_label: isTaskExists
title: isTaskExists method
description: "überprüft, ob eine Aufgabe mit der angegebenen ID vorhanden ist"
---

# isTaskExists

### Description

@short: Überprüft, ob eine Aufgabe mit der angegebenen ID vorhanden ist

@signature: isTaskExists: (id: string | number) =\> boolean

### Parameters

- `id` - (required) *string | number* -    die ID der Aufgabe

### Returns
- ` task` - (boolean) - <i>true</i>, wenn die Aufgabe gefunden wurde, andernfalls <i>false</i>

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2023",
    duration:28
}, "project_2");

gantt.isTaskExists(10); // ->true
~~~
