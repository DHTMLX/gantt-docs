---
sidebar_label: multiselect
title: multiselect config
description: "Steuert, ob mehrere Aufgaben gleichzeitig im Gantt-Diagramm ausgewählt werden können"
---

# multiselect

### Description

@short: Aktiviert bzw. deaktiviert die Mehrfachauswahl von Aufgaben im Gantt-Diagramm

@signature: multiselect: boolean

### Example

~~~jsx
gantt.config.multiselect = false; //disables multi-task selection
gantt.init('gantt_here');
~~~

**Standardwert:** true

### Details

:::note
Diese Option ist in der **multiselect**-Erweiterung definiert, daher müssen Sie das [multiselect](guides/extensions-list.md#multitaskselection) Plugin aktivieren. Lesen Sie die Details im Artikel [Multi-Task Selection](guides/multiselection.md). 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md)