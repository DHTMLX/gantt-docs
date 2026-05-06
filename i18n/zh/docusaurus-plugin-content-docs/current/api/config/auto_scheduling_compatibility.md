---
sidebar_label: auto_scheduling_compatibility
title: Auto_scheduling_compatibility 配置
description: "禁用任务的时间约束"
---

# auto_scheduling_compatibility

:::info
此功能仅在 PRO 版本中可用。
:::

:::warning
属性在 v9.1 中已被弃用，请改用 [gantt.config.auto_scheduling](api/config/auto_scheduling.md#apply_constraints) 的 `apply_constraints` 属性。
:::

### Description

@short: 禁用任务的时间约束

@signature: auto_scheduling_compatibility: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_compatibility = true;
~~~

**Default value:** false

### Details

:::note
此配置在 **auto_scheduling** 扩展中定义，因此您需要启用 [auto_scheduling](guides/extensions-list.md#autoscheduling) 插件。请在 [自动排程](guides/auto-scheduling.md) 文章中阅读详细信息。
:::

The [时间约束功能](guides/auto-scheduling.md#timeconstraintsfortasks) 于 v6.1 引入，以改进 Gantt 的自动排程逻辑。  
为 [向后兼容以前版本](guides/auto-scheduling.md) 而添加了 **auto_scheduling_compatibility** 配置。

### Related Guides
- [自动排程](guides/auto-scheduling.md)

### Change log
- 于 v6.1 中添加，以实现与早期版本的兼容。