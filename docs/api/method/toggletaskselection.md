---
sidebar_label: toggleTaskSelection
title: toggleTaskSelection method
description: "selects the specified task if it was unselected and vice versa"
---

# toggleTaskSelection

### Description

@short: Selects the specified task if it was unselected and vice versa

@signature: toggleTaskSelection: (taskId: string | number) =\> void

### Parameters

- `taskId` - (required) *string | number* -  the task's id

### Example

~~~jsx
gantt.toggleTaskSelection("t_1"); 
gantt.render();
~~~

### Details

:::note
This method is defined in the **multiselect** extension, so you need to activate the [multiselect](guides/extensions-list.md#multitaskselection) plugin. Read the details in the [Multi-Task Selection](guides/multiselection.md) article. 
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

