---
sidebar_label: isSelectedTask
title: isSelectedTask method
description: "checks whether the specified task is currently selected"
---

# isSelectedTask

### Description

@short: Checks whether the specified task is currently selected

@signature: isSelectedTask: (task: string | number) =\> boolean

### Parameters

- `task` - (required) *string | number* -    the task's id

### Returns
- ` value` - (boolean) - 'true' if the specified task is currently selected, otherwise - 'false'

### Example

~~~jsx
gantt.templates.task_class = 
gantt.templates.grid_row_class = 
gantt.templates.task_row_class = function (start, end, task) {
    if (gantt.isSelectedTask(task.id))
        return "gantt_selected";
};
~~~

### Related samples
- [Multiselection and Indent/Outdent tasks](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

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
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md)

