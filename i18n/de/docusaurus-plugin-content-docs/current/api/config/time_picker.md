---
sidebar_label: time_picker
title: time_picker Konfiguration
description: "Legt das Format des Time-Dropdown-Auswahlfelds im Lightbox fest"
---

# time_picker

### Description

@short: Legt das Format des Time-Dropdown-Auswahlfelds im Lightbox fest

@signature: time_picker: string

### Example

~~~jsx
gantt.config.time_picker = "%H:%s";

gantt.init("gantt_here");
~~~

**Standardwert:** "%H:%i"

### Related API
- [time_picker](api/template/time_picker.md)

### Related Guides
- [Date Format Specification](guides/date-format.md)