---
sidebar_label: time_picker
title: time_picker config
description: "sets the format of the time drop-down selector in the lightbox"
---

# time_picker

### Description

@short: Sets the format of the time drop-down selector in the lightbox

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
- [Date Format Specification](guides/date-format.md)

