---
sidebar_label: highlight_critical_path
title: highlight_critical_path config
description: "shows the critical path in the chart"
---

# highlight_critical_path

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Shows the critical path in the chart

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
This option is defined in the **critical_path** extension, so you need to activate the [critical_path](guides/extensions-list.md#critical-path) plugin. Read the details in the [Critical Path](guides/critical-path.md) article. 
:::

### Related API
- [isCriticalTask](api/method/iscriticaltask.md)
- [isCriticalLink](api/method/iscriticallink.md)

### Related Guides
- [Critical Path](guides/critical-path.md)

