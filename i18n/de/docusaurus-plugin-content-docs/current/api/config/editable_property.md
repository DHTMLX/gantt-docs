---
sidebar_label: editable_property
title: editable_property Konfiguration
description: "Ändert den Namen einer Eigenschaft, die die Bearbeitungsmöglichkeit von Aufgaben/Verknüpfungen im Nur-Lese-Gantt-Diagramm beeinflusst"
---

# editable_property

### Description

@short: Ändert den Namen einer Eigenschaft, die die Bearbeitungsmöglichkeit von Aufgaben/Verknüpfungen im Nur-Lese-Gantt-Diagramm beeinflusst

@signature: editable_property: string

### Example

~~~jsx
gantt.config.editable_property = "property_name";
~~~

### Details

Der Standardwert der Option ist "editable".

### Related API
- [readonly_property](api/config/readonly_property.md)

### Related Guides
- [Nur-Lese-Modus](guides/readonly-mode.md#readonlymodefortheentiregantt)