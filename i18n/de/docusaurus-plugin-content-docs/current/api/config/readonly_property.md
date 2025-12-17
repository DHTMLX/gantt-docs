---
sidebar_label: readonly_property
title: readonly_property config
description: "Legt den Namen der Property fest, die den Read-Only-Status von Tasks und Links steuert"
---

# readonly_property

### Description

@short: Legt den Namen der Property fest, die den Read-Only-Status von Tasks und Links steuert

@signature: readonly_property: string

### Example

~~~jsx
gantt.config.readonly_property = "property_name";
~~~

### Details

Standardmäßig ist diese Option auf "readonly" gesetzt.

### Related API
- [editable_property](api/config/editable_property.md)

### Related Guides
- ["Schreibgeschützter Modus"](guides/readonly-mode.md#readonlymodeforspecifictaskslinks)

