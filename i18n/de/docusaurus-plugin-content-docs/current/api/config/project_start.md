---
sidebar_label: project_start
title: project_start config
description: "legt das Startdatum für ein Projekt fest"
---

# project_start
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Legt das Startdatum für ein Projekt fest

@signature: project_start: Date | undefined

### Example

~~~jsx
gantt.config.project_start = new Date(2019, 2, 1);
~~~

### Related samples
- [Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

### Details

Diese Einstellung definiert das Standard-Startdatum für neue Tasks, wenn die automatische Terminplanung aktiviert ist.

### Related Guides
- ["Auto Scheduling"](guides/auto-scheduling.md)
