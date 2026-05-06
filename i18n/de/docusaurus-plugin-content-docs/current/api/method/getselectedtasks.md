---
sidebar_label: getSelectedTasks
title: getSelectedTasks Methode
description: "Gibt ein Array der aktuell ausgewählten Tasks zurück"
---

# getSelectedTasks

### Description

@short: Gibt ein Array der aktuell ausgewählten Tasks zurück

@signature: getSelectedTasks: () => any[]

### Returns
- ` tasks` - (array) - ein Array der IDs der Tasks

### Example

~~~jsx
gantt.getSelectedTasks();
~~~

### Details

:::note
Diese Methode ist in der **multiselect**-Erweiterung definiert, daher müssen Sie das [multiselect](guides/extensions-list.md#multitaskselection) Plugin aktivieren. Lesen Sie die Details im Artikel [Multi-Task Selection](guides/multiselection.md).
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
- [Multi-Task Selection](guides/multiselection.md)