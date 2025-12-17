---
sidebar_label: cascade_delete
title: cascade_delete config
description: "ermöglicht das automatische Löschen von verschachtelten Tasks und Links, wenn ein übergeordneter Task gelöscht wird"
---

# cascade_delete

### Description

@short: Ermöglicht das automatische Löschen von verschachtelten Tasks und Links, wenn ein übergeordneter Task gelöscht wird

@signature: cascade_delete: boolean

### Example

~~~jsx
gantt.config.cascade_delete = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

eingeführt in Version 4.2

### Related Guides
- ["Grundlegende Operationen mit Aufgaben"](guides/crud-task.md#cascadedeletingofnestedtasks)
