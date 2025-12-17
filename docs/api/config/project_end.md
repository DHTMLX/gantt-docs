---
sidebar_label: project_end
title: project_end config
description: "specifies the end date of a project"
---

# project_end

:::info
This functionality is available in the PRO edition only. 
:::

### Description

@short: Specifies the end date of a project

@signature: project_end: Date | undefined

### Example

~~~jsx
gantt.config.project_end = new Date(2019, 2, 1);
~~~

### Related samples
- [Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

### Details

The value of this config can be used as the default end date of new tasks, when backward scheduling is enabled.

### Related API
- [schedule_from_end](api/config/schedule_from_end.md)

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)

