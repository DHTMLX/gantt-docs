---
sidebar_label: touch_feedback
title: touch_feedback Konfiguration
description: "Gibt Vibrationsfeedback vor/nach Drag & Drop auf Touch-Geräten zurück"
---

# touch_feedback

### Description

@short: Gibt Vibrationsfeedback vor/nach Drag & Drop auf Touch-Geräten zurück

@signature: touch_feedback: boolean

### Example

~~~jsx
gantt.config.touch_feedback = false;
...
gantt.init("gantt_here");
~~~

**Standardwert:** true

### Details

Hinweis: Die Konfiguration hat keine Wirkung, wenn: 

1. Die Touch-Unterstützung wird durch die Konfigurationsoption [touch](api/config/touch.md) deaktiviert.
2. Der Browser unterstützt nicht die [Vibration API](https://caniuse.com/vibration).

### Related API
- [touch](api/config/touch.md)
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)