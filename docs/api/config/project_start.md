---
sidebar_label: project_start
title: project_start config
description: "specifies the start date of a project"
---

# project_start

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Specifies the start date of a project

@signature: project_start: Date | undefined

### Example

~~~jsx
gantt.config.project_start = new Date(2019, 2, 1);
~~~

### Related samples
- [Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

### Details

The value of this config can be used as the default start date of new tasks, when auto scheduling is enabled.

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)
