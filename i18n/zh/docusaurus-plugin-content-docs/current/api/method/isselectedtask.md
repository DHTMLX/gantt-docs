---
sidebar_label: isSelectedTask
title: isSelectedTask method
description: "检查指定的任务当前是否被选中"
---

# isSelectedTask

### Description

@short: 检查指定的任务当前是否被选中

@signature: isSelectedTask: (task: string | number) =\> boolean

### Parameters

- `task` - (required) *string | number* -    任务的ID

### Returns
- ` value` - (boolean) - 如果任务被选中则返回 'true'，否则返回 'false'

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
 此方法来自 **multiselect** 扩展，因此请确保已启用 [multiselect](guides/extensions-list.md#duorenwuxuanze) 插件。更多信息请参考 [多任务选择](guides/multiselection.md) 文章。 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- [多任务选择](guides/multiselection.md)

