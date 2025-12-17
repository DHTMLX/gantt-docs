---
sidebar_label: multiselect
title: multiselect config
description: "enables/disables multi-task selection in the Gantt chart"
---

# multiselect

### Description

@short: Enables/disables multi-task selection in the Gantt chart

@signature: multiselect: boolean

### Example

~~~jsx
gantt.config.multiselect = false; //disables multi-task selection
gantt.init('gantt_here');
~~~

**Default value:** true

### Details

:::note
This option is defined in the **multiselect** extension, so you need to activate the [multiselect](guides/extensions-list.md#multitaskselection) plugin. Read the details in the [Multi-Task Selection](guides/multiselection.md) article. 
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

