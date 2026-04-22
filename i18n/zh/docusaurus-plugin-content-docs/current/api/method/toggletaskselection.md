---
sidebar_label: toggleTaskSelection
title: toggleTaskSelection method
description: "切换指定任务的选择状态 - 如果任务未被选中，则选中它；如果任务已被选中，则取消选择"
---

# toggleTaskSelection

### Description

@short: 选择指定的任务（如果未被选中则选中，若已选中则取消选中）

@signature: toggleTaskSelection: (taskId: string | number) =\> void

### Parameters

- `taskId` - (required) *string | number* -  任务的 ID

### Example

~~~jsx
gantt.toggleTaskSelection("t_1"); 
gantt.render();
~~~

### Details

:::note
此方法在 **multiselect** 扩展中定义，因此需要激活 [multiselect](guides/extensions-list.md#multitaskselection) 插件。请在 [Multi-Task Selection](guides/multiselection.md) 文章中阅读详细信息。 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)

### Related Guides
- [多任务选择](guides/multiselection.md)