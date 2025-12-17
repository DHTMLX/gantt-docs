---
sidebar_label: project_end
title: project_end config
description: "legt das Enddatum des Projekts fest"
---

# project_end
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Legt das Enddatum des Projekts fest

@signature: project_end: Date | undefined

### Example

~~~jsx
gantt.config.project_end = new Date(2019, 2, 1);
~~~

### Related samples
- [Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

### Details

Diese Einstellung kann als Standard-Enddatum für neue Tasks dienen, wenn die Rückwärtsplanung aktiviert ist.

### Related API
- [schedule_from_end](api/config/schedule_from_end.md)

### Related Guides
- ["Auto Scheduling"](guides/auto-scheduling.md)

