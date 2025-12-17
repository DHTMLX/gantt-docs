---
sidebar_label: getSelectedTasks
title: getSelectedTasks method
description: "returns an array of the currently selected tasks"
---

# getSelectedTasks

### Description

@short: Returns an array of the currently selected tasks

@signature: getSelectedTasks: () =\> any[]

### Returns
- ` tasks` - (array) - an array of tasks' ids

### Example

~~~jsx
gantt.getSelectedTasks();
~~~

### Details

:::note
This method is defined in the **multiselect** extension, so you need to activate the [multiselect](guides/extensions-list.md#multitaskselection) plugin. Read the details in the [Multi-Task Selection](guides/multiselection.md) article. 
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

