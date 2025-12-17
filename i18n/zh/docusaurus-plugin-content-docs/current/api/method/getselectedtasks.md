---
sidebar_label: getSelectedTasks
title: getSelectedTasks method
description: "返回当前选中的任务数组"
---

# getSelectedTasks

### Description

@short: 返回当前选中的任务数组

@signature: getSelectedTasks: () =\> any[]

### Returns
- ` tasks` - (array) - 一个包含任务ID的数组

### Example

~~~jsx
gantt.getSelectedTasks();
~~~

### Details

:::note
 此方法来自 **multiselect** 扩展，因此请确保启用了 [multiselect](guides/extensions-list.md) 插件。更多详情，请参阅 [多任务选择](guides/multiselection.md) 文章。 
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
- [多任务选择](guides/multiselection.md)

