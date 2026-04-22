---
sidebar_label: auto_scheduling_compatibility
title: Auto_scheduling_compatibility Konfiguration
description: "Deaktiviert die Verwendung von Zeitbeschränkungen für Aufgaben"
---

# auto_scheduling_compatibility

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar. 
:::

:::warning
Die Eigenschaft wurde in v9.1 als veraltet markiert; verwenden Sie stattdessen die `apply_constraints`-Eigenschaft von [gantt.config.auto_scheduling](api/config/auto_scheduling.md#apply_constraints).
:::

### Description

@short: Deaktiviert die Verwendung von Zeitbeschränkungen für Aufgaben

@signature: auto_scheduling_compatibility: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_compatibility = true;
~~~

**Standardwert:** false

### Details

:::note
Diese Konfiguration ist in der **auto_scheduling**-Erweiterung definiert, daher müssen Sie das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin aktivieren. Lesen Sie die Details im Artikel [Auto Scheduling](guides/auto-scheduling.md). 
:::

Die [Zeitbeschränkungs-Funktionalität](guides/auto-scheduling.md#timeconstraintsfortasks) wurde in v6.1 eingeführt, um die Auto Scheduling-Logik von Gantt zu verbessern. 
Die **auto_scheduling_compatibility**-Konfiguration wurde hinzugefügt, um die Abwärtskompatibilität mit früheren Versionen zu gewährleisten.

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- in v6.1 hinzugefügt zur Sicherstellung der Abwärtskompatibilität mit früheren Versionen