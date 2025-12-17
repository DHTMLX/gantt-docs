---
sidebar_label: getLastSelectedTask
title: getLastSelectedTask method
description: "提供最近一次选中任务的ID"
---

# getLastSelectedTask

### Description

@short: 提供最近一次选中任务的ID

@signature: getLastSelectedTask: () =\> string | number

### Returns
- ` id` - (string | number) - 最近一次选中任务的ID

### Example

~~~jsx
gantt.getLastSelectedTask();
~~~

### Details

:::note
 此方法属于 **multiselect** 扩展，因此请确保启用了 [multiselect](guides/extensions-list.md) 插件。更多信息请参见 [多任务选择](guides/multiselection.md) 文章。 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- [多任务选择](guides/multiselection.md)

