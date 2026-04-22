---
sidebar_label: project_end
title: project_end config
description: "legt das Enddatum eines Projekts fest"
---

# project_end

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

### Description

@short: Legt das Enddatum eines Projekts fest

@signature: project_end: Date | undefined

### Example

~~~jsx
gantt.config.project_end = new Date(2019, 2, 1);
~~~

### Related samples
- [Automatisches Planen vom Projektende (rückwärts)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

### Details

Der Wert dieser Konfiguration kann als Standard-Enddatum für neue Aufgaben verwendet werden, wenn eine Rückwärtsplanung aktiviert ist.

### Related API
- [schedule_from_end](api/config/schedule_from_end.md)

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)