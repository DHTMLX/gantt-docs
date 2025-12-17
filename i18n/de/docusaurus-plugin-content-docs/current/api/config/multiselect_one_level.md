---
sidebar_label: multiselect_one_level
title: multiselect_one_level config
description: "Steuert, ob die Mehrfachauswahl von Aufgaben auf eine Ebene beschränkt ist oder mehrere Ebenen umfassen kann"
---

# multiselect_one_level

### Description

@short: Steuert, ob die Mehrfachauswahl von Aufgaben auf eine Ebene beschränkt ist oder mehrere Ebenen umfassen kann

@signature: multiselect_one_level: boolean

### Example

~~~jsx
gantt.config.multiselect_one_level = true; 
gantt.init('gantt_here');

//FALSCH
gantt.config.multiselect = false;  /*!*/ //Mehrfachauswahl ist deaktiviert
gantt.config.multiselect_one_level = true; 
gantt.init('gantt_here');
~~~

**Default value:** false

### Details

:::note

Diese Einstellung gilt nur, wenn die Option [multiselect](api/config/multiselect.md) aktiviert ist.
 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- ["Multi-Task-Auswahl"](guides/multiselection.md)

