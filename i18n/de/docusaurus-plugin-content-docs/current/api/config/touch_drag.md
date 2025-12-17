---
sidebar_label: touch_drag
title: touch_drag config
description: "Legt den Zeitraum in Millisekunden fest, um eine lange Touch-Geste von einer Scroll-Geste zu unterscheiden"
---

# touch_drag

### Description

@short: Legt den Zeitraum in Millisekunden fest, um eine lange Touch-Geste von einer Scroll-Geste zu unterscheiden

@signature: touch_drag: number | boolean

### Example

~~~jsx
gantt.config.touch_drag = 75;
...
gantt.init("gantt_here");
~~~

**Default value:** 500

### Details

Beachten Sie, dass wenn dieser Parameter auf *false* gesetzt ist, Benutzer keine Aufgaben per Drag & Drop verschieben können.

### Related API
- [touch](api/config/touch.md)
- [touch_feedback](api/config/touch_feedback.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)

