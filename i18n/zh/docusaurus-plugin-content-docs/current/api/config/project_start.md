---
sidebar_label: project_start
title: project_start config
description: "设置项目的开始日期"
---

# project_start
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 设置项目的开始日期

@signature: project_start: Date | undefined

### Example

~~~jsx
gantt.config.project_start = new Date(2019, 2, 1);
~~~

### Related samples
- [Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

### Details

此设置定义了在启用自动排程时，新任务的默认开始日期。

### Related Guides
- [自动调度](guides/auto-scheduling.md)
