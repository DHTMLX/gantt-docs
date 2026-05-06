---
sidebar_label: project_start
title: project_start 配置
description: "指定项目的开始日期"
---

# project_start

:::info
此功能仅在 PRO 版本中可用。 
:::

### Description

@short: 指定项目的开始日期

@signature: project_start: Date | undefined

### Example

~~~jsx
gantt.config.project_start = new Date(2019, 2, 1);
~~~

### Related samples
- [基于项目开始与约束的自动排程](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

### Details

该配置的值可用作新任务的默认开始日期，当启用自动排程时。

### Related Guides
- [自动排程](guides/auto-scheduling.md)