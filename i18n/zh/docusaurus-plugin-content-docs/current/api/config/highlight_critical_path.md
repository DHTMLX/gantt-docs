---
sidebar_label: highlight_critical_path
title: highlight_critical_path 配置
description: "在图表中显示关键路径"
---

# highlight_critical_path

:::info
 此功能仅包含在 PRO 版本中。 
:::

### Description

@short: 显示图表中的关键路径

@signature: highlight_critical_path: boolean

### Example

~~~jsx
gantt.config.highlight_critical_path = true; /*!*/

gantt.init("gantt_here");
~~~

**默认值：** false

### Related samples
- [Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

### Details

:::note
此选项在 **critical_path** 扩展中定义，因此您需要激活 [critical_path](guides/extensions-list.md#critical-path) 插件。请在 [关键路径](guides/critical-path.md) 文章中查看详细信息。 
:::

启用此选项后，任务或链接的每次更改都会重绘整个图表。对于大型图表，请仅在用户需要查看关键路径时才启用该选项，或使用 [batchUpdate](api/method/batchupdate.md) 对更改进行分组。

### Related API
- [isCriticalTask](api/method/iscriticaltask.md)
- [isCriticalLink](api/method/iscriticallink.md)

### Related Guides
- [关键路径](guides/critical-path.md)
- [性能：提升性能的方法](guides/performance.md#common-techniques)