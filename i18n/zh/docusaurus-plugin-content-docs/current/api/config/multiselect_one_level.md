---
sidebar_label: multiselect_one_level
title: multiselect_one_level config
description: "控制多任务选择是否限制在单一级别，还是可以跨多个级别"
---

# multiselect_one_level

### Description

@short: 控制多任务选择是否限制在单一级别，还是可以跨多个级别

@signature: multiselect_one_level: boolean

### Example

~~~jsx
gantt.config.multiselect_one_level = true; 
gantt.init('gantt_here');

//错误示例
gantt.config.multiselect = false;  /*!*/ //多选被关闭
gantt.config.multiselect_one_level = true; 
gantt.init('gantt_here');
~~~

**Default value:** false

### Details

:::note

此设置仅在启用 [multiselect](api/config/multiselect.md) 选项时生效。
 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- [多任务选择](guides/multiselection.md)

