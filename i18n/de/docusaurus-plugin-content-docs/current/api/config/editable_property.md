---
sidebar_label: editable_property
title: editable_property config
description: "Ändert den Namen einer Eigenschaft, die steuert, ob Aufgaben oder Links im read-only Gantt-Diagramm bearbeitet werden können"
---

# editable_property

### Description

@short: Ändert den Namen einer Eigenschaft, die steuert, ob Aufgaben oder Links im read-only Gantt-Diagramm bearbeitet werden können

@signature: editable_property: string

### Example

~~~jsx
gantt.config.editable_property = "property_name";
~~~

### Details

Standardmäßig ist diese Option auf "editable" gesetzt.

### Related API
- [readonly_property](api/config/readonly_property.md)

### Related Guides
- ["Schreibgeschützter Modus"](guides/readonly-mode.md#readonlymodefortheentiregantt)

