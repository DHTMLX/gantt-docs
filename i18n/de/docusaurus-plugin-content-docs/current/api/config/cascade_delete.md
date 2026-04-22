---
sidebar_label: cascade_delete
title: cascade_delete Konfiguration
description: "Aktiviert die kaskadierende Löschung verschachtelter Aufgaben und Verknüpfungen"
---

# cascade_delete

### Description

@short: Aktiviert die kaskadierende Löschung verschachtelter Aufgaben und Verknüpfungen

@signature: cascade_delete: boolean

### Example

~~~jsx
gantt.config.cascade_delete = false;
gantt.init("gantt_here");
~~~

**Standardwert:** true

### Details

Hinzugefügt in Version 4.2

### Related Guides
- [Grundlegende Operationen mit Aufgaben](guides/crud-task.md)