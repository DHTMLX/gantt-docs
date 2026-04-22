---
sidebar_label: isTaskExists
title: isTaskExists Methode
description: "prüft, ob die angegebene Aufgabe existiert"
---

# isTaskExists

### Description

@short: Prüft, ob die angegebene Aufgabe existiert

@signature: isTaskExists: (id: string | number) =\> boolean

### Parameters

- `id` - (required) *string | number* - die Aufgaben-ID

### Returns
- ` task` - (boolean) - <i>true</i>, falls eine solche Aufgabe existiert. Andernfalls <i>false</i>

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