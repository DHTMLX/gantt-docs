---
sidebar_label: project_end
title: project_end config
description: "设置项目的结束日期"
---

# project_end
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 设置项目的结束日期

@signature: project_end: Date | undefined

### Example

~~~jsx
gantt.config.project_end = new Date(2019, 2, 1);
~~~

### Related samples
- [Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

### Details

当启用向后排程时，此设置可作为新任务的默认结束日期。

### Related API
- [schedule_from_end](api/config/schedule_from_end.md)

### Related Guides
- [自动调度](guides/auto-scheduling.md)

