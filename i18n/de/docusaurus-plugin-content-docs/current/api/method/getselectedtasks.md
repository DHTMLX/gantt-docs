---
sidebar_label: getSelectedTasks
title: getSelectedTasks method
description: "Gibt ein Array der aktuell ausgewählten Tasks zurück"
---

# getSelectedTasks

### Description

@short: Gibt ein Array der aktuell ausgewählten Tasks zurück

@signature: getSelectedTasks: () =\> any[]

### Returns
- ` tasks` - (array) - Ein Array mit den IDs der Tasks

### Example

~~~jsx
gantt.getSelectedTasks();
~~~

### Details

:::note
note Diese Methode stammt aus der **multiselect**-Erweiterung, daher stellen Sie sicher, dass das [multiselect](guides/extensions-list.md#multitaskselection) Plugin aktiviert ist. Für weitere Details lesen Sie den Artikel ["Multi-Task-Auswahl"](guides/multiselection.md). 
:::

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- ["Multi-Task-Auswahl"](guides/multiselection.md)

