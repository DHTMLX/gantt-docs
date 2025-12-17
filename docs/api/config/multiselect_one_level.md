---
sidebar_label: multiselect_one_level
title: multiselect_one_level config
description: "specifies whether multi-task selection will be available within one or any level"
---

# multiselect_one_level

### Description

@short: Specifies whether multi-task selection will be available within one or any level

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

**Default value:** false

### Details

:::note
The option makes sense only when the [multiselect](api/config/multiselect.md) option is enabled. 
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

