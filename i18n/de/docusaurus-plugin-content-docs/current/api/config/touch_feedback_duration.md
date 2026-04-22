---
sidebar_label: touch_feedback_duration
title: touch_feedback_duration Konfiguration
description: "definiert die Dauer des Vibrations-Feedbacks vor/nach Drag & Drop auf Touch-Geräten (in Millisekunden)"
---

# touch_feedback_duration

### Description

@short: Definiert die Dauer des Vibrations-Feedbacks vor/nach Drag & Drop auf Touch-Geräten (in Millisekunden)

@signature: touch_feedback_duration: number

### Example

~~~jsx
gantt.config.touch_feedback_duration = 1;
...
gantt.init("gantt_here");
~~~

**Standardwert:** 1

### Details

Hinzugefügt in Version 4.1

Hinweis: Die Konfiguration hat keinen Effekt, wenn:

1. Die Touch-Unterstützung durch die Konfigurationsoption [touch](api/config/touch.md) deaktiviert ist.
2. Der Browser die [Vibration API](https://caniuse.com/vibration) nicht unterstützt.

### Related API
- [touch](api/config/touch.md)
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback](api/config/touch_feedback.md)