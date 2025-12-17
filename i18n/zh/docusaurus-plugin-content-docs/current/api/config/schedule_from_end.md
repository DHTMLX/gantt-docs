---
sidebar_label: schedule_from_end
title: schedule_from_end config
description: "启用向后排程"
---

# schedule_from_end
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 启用向后排程

@signature: schedule_from_end: boolean

### Example

~~~jsx
gantt.config.schedule_from_end = true;
gantt.config.project_end = new Date(2019, 4, 1);
~~~

**Default value:** false

### Related samples
- [Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

### Details

将此选项设置为 `true` 后，自动排程模式将切换为"尽可能晚"。

此设置仅在同时指定了 [project_end](api/config/project_end.md) 时生效。

### Related API
- [project_end](api/config/project_end.md)

### Related Guides
- [自动调度](guides/auto-scheduling.md)

