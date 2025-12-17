---
sidebar_label: touch_feedback
title: touch_feedback config
description: "aktiviert Vibrations-Feedback vor oder nach Drag-and-Drop-Aktionen auf Touch-Geräten"
---

# touch_feedback

### Description

@short: Aktiviert Vibrations-Feedback vor oder nach Drag-and-Drop-Aktionen auf Touch-Geräten

@signature: touch_feedback: boolean

### Example

~~~jsx
gantt.config.touch_feedback = false;
...
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

Beachten Sie, dass diese Einstellung keine Wirkung hat, wenn:

1. Die Touch-Unterstützung über die [touch](api/config/touch.md) Option deaktiviert ist.
2. Der Browser die [Vibration API](https://caniuse.com/vibration) nicht unterstützt.

### Related API
- [touch](api/config/touch.md)
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)

