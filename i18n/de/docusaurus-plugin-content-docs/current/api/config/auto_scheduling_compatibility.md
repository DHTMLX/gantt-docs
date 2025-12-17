---
sidebar_label: auto_scheduling_compatibility
title: auto_scheduling_compatibility config
description: "deaktiviert die Verwendung von Zeitbeschränkungen für Aufgaben"
---

# auto_scheduling_compatibility

### Description

@short: Deaktiviert die Verwendung von Zeitbeschränkungen für Aufgaben

@signature: auto_scheduling_compatibility: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_compatibility = true;
~~~

**Default value:** false

### Details

:::note
 Diese Funktion ist nur in der PRO Edition verfügbar. 
:::

:::note
 Diese Einstellung ist Teil der **auto_scheduling** Erweiterung, daher stellen Sie sicher, dass das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin aktiviert ist. Weitere Informationen finden Sie im Artikel ["Auto Scheduling"](guides/auto-scheduling.md). 
:::

Die [Funktionalität der Zeitbeschränkungen](guides/auto-scheduling.md#timeconstraintsfortasks) wurde in Version 6.1 eingeführt, um die Auto-Scheduling-Fähigkeiten des Gantt zu verbessern. 
Die Option **auto_scheduling_compatibility** wurde hinzugefügt, um die [Kompatibilität mit früheren Versionen](guides/auto-scheduling.md#versioncompatibility) zu gewährleisten.

### Related Guides
- ["Auto Scheduling"](guides/auto-scheduling.md)

### Change log
- in Version 6.1 hinzugefügt, um die Kompatibilität mit vorherigen Versionen zu unterstützen
