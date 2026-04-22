---
sidebar_label: toggleTaskSelection
title: toggleTaskSelection method
description: "Wählt die angegebene Aufgabe aus, falls sie zuvor nicht ausgewählt war, und umgekehrt"
---

# toggleTaskSelection

### Description

@short: Wählt die angegebene Aufgabe aus, falls sie zuvor nicht ausgewählt war, und umgekehrt

@signature: toggleTaskSelection: (taskId: string | number) =\> void

### Parameters

- `taskId` - (erforderlich) *string | number* - die ID der Aufgabe

### Example

~~~jsx
gantt.toggleTaskSelection("t_1"); 
gantt.render();
~~~

### Details

:::note
Diese Methode ist in der **multiselect**-Erweiterung definiert, daher müssen Sie das [multiselect](guides/extensions-list.md#multitaskselection) Plugin aktivieren. Lesen Sie die Details im [Multi-Task Selection](guides/multiselection.md) Artikel.
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md)