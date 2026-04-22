---
sidebar_label: auto_types
title: auto_types Konfiguration
description: "Konvertiert automatisch Aufgaben mit Unteraufgaben in Projekte und Projekte ohne Unteraufgaben zurück in Aufgaben"
---

# auto_types

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

### Description

@short: Automatisch wandelt Aufgaben mit Unteraufgaben in Projekte um und Projekte ohne Unteraufgaben zurück in Aufgaben

@signature: auto_types: boolean

### Example

~~~jsx
gantt.config.auto_types = true;
~~~

**Standardwert:** false


### Related samples
- [Erstellen von Zusammenfassungsaufgaben dynamisch (auto_types)](https://docs.dhtmlx.com/gantt/samples/04_customization/19_task_type.html)

### Related Guides
- [Inline-Bearbeitung im Grid](guides/inline-editing.md#inline-editing-modes)
- [Aufgabentypen](guides/task-types.md)