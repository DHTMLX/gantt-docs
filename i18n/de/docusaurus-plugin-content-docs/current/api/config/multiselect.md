---
sidebar_label: multiselect
title: multiselect config
description: "Steuert, ob mehrere Aufgaben gleichzeitig im Gantt-Diagramm ausgewählt werden können"
---

# multiselect

### Description

@short: Steuert, ob mehrere Aufgaben gleichzeitig im Gantt-Diagramm ausgewählt werden können

@signature: multiselect: boolean

### Example

~~~jsx
gantt.config.multiselect = false; // schaltet die Mehrfachauswahl von Aufgaben aus
gantt.init('gantt_here');
~~~

**Default value:** true

### Details

:::note
 Diese Einstellung ist Teil der **multiselect** Erweiterung, daher stellen Sie sicher, dass das [multiselect](guides/extensions-list.md#multitaskselection) Plugin aktiviert ist. Weitere Details finden Sie im Artikel ["Multi-Task-Auswahl"](guides/multiselection.md). 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- ["Multi-Task-Auswahl"](guides/multiselection.md)

