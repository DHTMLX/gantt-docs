---
sidebar_label: project_end
title: project_end config
description: "指定项目的结束日期"
---

# project_end

:::info
此功能仅在 PRO 版本中提供。
:::

### Description

@short: 指定项目的结束日期

@signature: project_end: Date | undefined

### Example

~~~jsx
gantt.config.project_end = new Date(2019, 2, 1);
~~~

### Related samples
- [从项目结束进行自动调度（向后）](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

### Details

当启用向后调度时，该配置的值可作为新任务的默认结束日期。

### Related API
- [schedule_from_end](api/config/schedule_from_end.md)

### Related Guides
- [自动排程](guides/auto-scheduling.md)