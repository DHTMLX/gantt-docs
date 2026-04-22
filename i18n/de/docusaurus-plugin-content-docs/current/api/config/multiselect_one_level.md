---
sidebar_label: multiselect_one_level
title: multiselect_one_level Konfiguration
description: "gibt an, ob Mehrfachauswahl innerhalb einer Ebene oder über alle Ebenen verfügbar ist"
---

# multiselect_one_level

### Description

@short: Gibt an, ob die Mehrfachauswahl innerhalb einer Ebene oder auf jeder Ebene verfügbar ist

@signature: multiselect_one_level: boolean

### Example

~~~jsx
gantt.config.multiselect_one_level = true; 
gantt.init('gantt_here');

//INCORRECT
gantt.config.multiselect = false;  /*!*/ //multiselection is disabled
gantt.config.multiselect_one_level = true; 
gantt.init('gantt_here');
~~~

**Standardwert:** false

### Details

:::note
Die Option ist nur sinnvoll, wenn die [multiselect](api/config/multiselect.md) Option aktiviert ist. 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md)