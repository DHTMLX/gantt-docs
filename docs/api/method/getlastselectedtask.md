---
sidebar_label: getLastSelectedTask
title: getLastSelectedTask method
description: "returns the id of the last selected task"
---

# getLastSelectedTask

### Description

@short: Returns the id of the last selected task

@signature: getLastSelectedTask: () =\> string | number

### Returns
- ` id` - (string | number) - the id of the last selected task

### Example

~~~jsx
gantt.getLastSelectedTask();
~~~

### Details

:::note
This method is defined in the **multiselect** extension, so you need to activate the [multiselect](guides/extensions-list.md#multitaskselection) plugin. Read the details in the [Multi-Task Selection](guides/multiselection.md) article. 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md)

