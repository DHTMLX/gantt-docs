---
sidebar_label: readonly_property
title: readonly_property Konfiguration
description: "ändert den Namen einer Eigenschaft, die das Read-Only-Verhalten von Aufgaben/Links beeinflusst"
---

# readonly_property

### Beschreibung

@short: Ändert den Namen einer Eigenschaft, die das Read-Only-Verhalten von Aufgaben/Links beeinflusst

@signature: readonly_property: string

### Beispiel

~~~jsx
gantt.config.readonly_property = "property_name";
~~~

### Details

Der Standardwert der Option ist "readonly".

### Verwandte API
- [editable_property](api/config/editable_property.md)

### Verwandte Guides
- [Nur-Lese-Modus](guides/readonly-mode.md)