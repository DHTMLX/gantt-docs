---
sidebar_label: auto_scheduling_compatibility
title: auto_scheduling_compatibility config
description: "关闭任务的时间约束使用"
---

# auto_scheduling_compatibility
:::info
 此功能仅在PRO版本中可用。 
:::
### Description

@short: 关闭任务的时间约束使用

@signature: auto_scheduling_compatibility: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_compatibility = true;
~~~

**Default value:** false

### Details

:::note
 此设置属于**auto_scheduling**扩展的一部分，因此请确保启用[auto_scheduling](guides/extensions-list.md#zidongpaicheng)插件。更多信息请参见[自动调度](guides/auto-scheduling.md)文档。 
:::

[时间约束功能](guides/auto-scheduling.md)在6.1版本中引入，用于增强甘特图的自动调度能力。 
**auto_scheduling_compatibility**选项则是为了[保持与早期版本的兼容性](guides/auto-scheduling.md)而添加的。

### Related Guides
- [自动调度](guides/auto-scheduling.md)

### Change log
- 在v6.1版本中添加以支持与之前版本的兼容性
