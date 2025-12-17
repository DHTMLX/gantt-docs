---
sidebar_label: time_picker
title: time_picker config
description: "definiert das Format für den Time-Dropdown-Selector im Lightbox"
---

# time_picker

### Description

@short: Definiert das Format für den Time-Dropdown-Selector im Lightbox

@signature: time_picker: string

### Example

~~~jsx
gantt.config.time_picker = "%H:%s";

gantt.init("gantt_here");
~~~

**Default value:** "%H:%i"

### Related API
- [time_picker](api/template/time_picker.md)

### Related Guides
- ["Datumsformat-Spezifikation"](guides/date-format.md)

