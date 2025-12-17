---
sidebar_label: getLastSelectedTask
title: getLastSelectedTask method
description: "liefert die ID der zuletzt ausgewählten Aufgabe"
---

# getLastSelectedTask

### Description

@short: Liefert die ID der zuletzt ausgewählten Aufgabe

@signature: getLastSelectedTask: () =\> string | number

### Returns
- ` id` - (string | number) - die ID der zuletzt ausgewählten Aufgabe

### Example

~~~jsx
gantt.getLastSelectedTask();
~~~

### Details

:::note
 Diese Methode ist Teil der **multiselect** Erweiterung. Stellen Sie daher sicher, dass das [multiselect](guides/extensions-list.md#multitaskselection) Plugin aktiviert ist. Weitere Informationen finden Sie im Artikel ["Multi-Task-Auswahl"](guides/multiselection.md). 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- ["Multi-Task-Auswahl"](guides/multiselection.md)

