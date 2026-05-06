---
sidebar_label: multiselect
title: multiselect config
description: "控制甘特图中是否允许同时选择多个任务"
---

# multiselect

### Description

@short: 启用/禁用甘特图中的多任务选择

@signature: multiselect: boolean

### Example

~~~jsx
gantt.config.multiselect = false; //禁用多任务选择
gantt.init('gantt_here');
~~~

**Default value:** true

### Details

:::note
本选项在 **multiselect** 扩展中定义，因此需要激活 [multiselect](guides/extensions-list.md#multitaskselection) 插件。请在 [Multi-Task Selection](guides/multiselection.md) 文章中查看详细信息。
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- [多任务选择](guides/multiselection.md)