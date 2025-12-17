---
sidebar_label: highlight_critical_path
title: highlight_critical_path config
description: "在图表中高亮显示关键路径"
---

# highlight_critical_path

:::info
 此功能仅包含在PRO版本中。 
:::
### Description

@short: 在图表中高亮显示关键路径

@signature: highlight_critical_path: boolean

### Example

~~~jsx
gantt.config.highlight_critical_path = true; /*!*/

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Critical path](https://docs.dhtmlx.com/gantt/samples/02_extensions/03_critical_path.html)

### Details


:::note
 该设置是**critical_path**扩展的一部分，因此请确保启用[critical_path](guides/extensions-list.md)插件。更多详情请参见[关键路径](guides/critical-path.md)文章。 
:::

### Related API
- [isCriticalTask](api/method/iscriticaltask.md)
- [isCriticalLink](api/method/iscriticallink.md)

### Related Guides
- [关键路径](guides/critical-path.md)

