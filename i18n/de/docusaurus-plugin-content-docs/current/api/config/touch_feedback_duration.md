---
sidebar_label: touch_feedback_duration
title: touch_feedback_duration config
description: "gibt an, wie lange das Vibrations-Feedback vor oder nach Drag-and-Drop-Aktionen auf Touch-Geräten anhält (gemessen in Millisekunden)"
---

# touch_feedback_duration

### Description

@short: Gibt an, wie lange das Vibrations-Feedback vor oder nach Drag-and-Drop-Aktionen auf Touch-Geräten anhält (gemessen in Millisekunden)

@signature: touch_feedback_duration: number

### Example

~~~jsx
gantt.config.touch_feedback_duration = 1;
...
gantt.init("gantt_here");
~~~

**Default value:** 1

### Details

eingeführt in Version 4.1

Beachte, dass diese Einstellung nicht funktioniert, wenn:

1. Die Touch-Unterstützung über die [touch](api/config/touch.md) Konfigurationsoption deaktiviert ist.
2. Der Browser die [Vibration API](https://caniuse.com/vibration) nicht unterstützt.

### Related API
- [touch](api/config/touch.md)
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback](api/config/touch_feedback.md)

