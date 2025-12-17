---
sidebar_label: multiselect
title: multiselect config
description: "控制甘特图中是否允许同时选择多个任务"
---

# multiselect

### Description

@short: 控制甘特图中是否允许同时选择多个任务

@signature: multiselect: boolean

### Example

~~~jsx
gantt.config.multiselect = false; // 关闭多任务选择  
gantt.init('gantt_here');
~~~

**Default value:** true

### Details

:::note
 此设置属于 **multiselect** 扩展的一部分，因此请确保启用 [multiselect](guides/extensions-list.md#duorenwuxuanze) 插件。更多详情请参阅 [多任务选择](guides/multiselection.md) 文章。 
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

