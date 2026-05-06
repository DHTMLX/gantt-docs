---
sidebar_label: getLastSelectedTask
title: getLastSelectedTask 方法
description: "返回最后选中的任务的 ID"
---

# getLastSelectedTask

### Description

@short: 返回最后选中的任务的 ID

@signature: getLastSelectedTask: () =\> string | number

### Returns
- ` id` - (string | number) - 最后选中的任务的 ID

### Example

~~~jsx
gantt.getLastSelectedTask();
~~~

### Details

:::note
本方法在 **multiselect** 扩展中定义，因此需要激活 [multiselect](guides/extensions-list.md#multitaskselection) 插件。有关更多细节，请阅读 [Multi-Task Selection](guides/multiselection.md) 文章。
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md)