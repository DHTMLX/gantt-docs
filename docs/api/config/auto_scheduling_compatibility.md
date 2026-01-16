---
sidebar_label: auto_scheduling_compatibility
title: Auto_scheduling_compatibility config
description: "Disables usage of time contraints for tasks"
---

# auto_scheduling_compatibility

:::info
This functionality is available in the PRO edition only. 
:::

:::warning
The property has been deprecated in v9.1, use the `apply_constraints` property of [gantt.config.auto_scheduling](api/config/auto_scheduling.md#apply_constraints) instead.
:::

### Description

@short: Disables usage of time contraints for tasks

@signature: auto_scheduling_compatibility: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_compatibility = true;
~~~

**Default value:** false

### Details

:::note
This config is defined in the **auto_scheduling** extension, so you need to enable the [auto_scheduling](guides/extensions-list.md#autoscheduling) plugin. Read the details in the [Auto Scheduling](guides/auto-scheduling.md) article. 
:::

The [time constraints functionality](guides/auto-scheduling.md#timeconstraintsfortasks) was introduced in v6.1 to improve the auto scheduling logic of Gantt. 
The **auto_scheduling_compatibility** config was added to [provide backward compatibility with previous versions](guides/auto-scheduling.md#version-compatibility).

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- added in v6.1 for compatibility with earlier versions
