---
sidebar_label: getSelectedTasks
title: getSelectedTasks 方法
description: "返回当前选中的任务数组"
---

# getSelectedTasks

### Description

@short: 返回当前选中的任务的数组

@signature: getSelectedTasks: () =\> any[]

### Returns
- ` tasks` - (array) - 任务的 ID 数组

### Example

~~~jsx
gantt.getSelectedTasks();
~~~

### Details

:::note
此方法在 **multiselect** 扩展中定义，因此你需要启用 [multiselect](guides/extensions-list.md#multitaskselection) 插件。请在 [Multi-Task Selection](guides/multiselection.md) 文章中阅读详细信息。
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