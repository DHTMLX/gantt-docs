---
sidebar_label: project_start
title: project_start Konfiguration
description: "legt das Startdatum eines Projekts fest"
---

# project_start

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

### Description

@short: Legt das Startdatum eines Projekts fest

@signature: project_start: Date | undefined

### Example

~~~jsx
gantt.config.project_start = new Date(2019, 2, 1);
~~~

### Related samples
- [Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

### Details

Der Wert dieser Konfiguration kann als Standard-Startdatum neuer Aufgaben verwendet werden, wenn die automatische Planung aktiviert ist.

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)