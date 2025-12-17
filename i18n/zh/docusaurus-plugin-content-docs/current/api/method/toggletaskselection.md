---
sidebar_label: toggleTaskSelection
title: toggleTaskSelection method
description: "切换指定任务的选择状态 - 如果任务未被选中，则选中它；如果任务已被选中，则取消选择"
---

# toggleTaskSelection

### Description

@short: 切换指定任务的选择状态 - 如果任务未被选中，则选中它；如果任务已被选中，则取消选择

@signature: toggleTaskSelection: (taskId: string | number) =\> void

### Parameters

- `taskId` - (required) *string | number* -        任务的ID

### Example

~~~jsx
gantt.toggleTaskSelection("t_1"); 
gantt.render();
~~~

### Details

:::note
 此方法是 **multiselect** 扩展的一部分，因此请确保先启用 [multiselect](guides/extensions-list.md) 插件。更多详情请参考 [多任务选择](guides/multiselection.md) 文章。 
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

