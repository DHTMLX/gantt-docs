---
sidebar_label: isSelectedTask
title: isSelectedTask method
description: "检查指定任务当前是否被选中"
---

# isSelectedTask

### Description

@short: 检查指定任务当前是否被选中

@signature: isSelectedTask: (task: string | number) =\> boolean

### Parameters

- `task` - (required) *string | number* - 该任务的 id

### Returns
- ` value` - (boolean) - 若指定任务当前被选中，则返回 'true'，否则返回 'false'

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
- [多选与缩进/取消缩进任务](https://docs.dhtmlx.com/gantt/samples/02_extensions/09_multiselection.html)

### Details

:::note
此方法在 **multiselect** 扩展中定义，因此需要启用 [multiselect](guides/extensions-list.md#multitaskselection) 插件。请在 [多任务选择](guides/multiselection.md) 文章中阅览详细信息。
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