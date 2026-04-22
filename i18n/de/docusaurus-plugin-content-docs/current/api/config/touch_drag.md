---
sidebar_label: touch_drag
title: touch_drag Konfiguration
description: "definiert den Zeitraum in Millisekunden, der verwendet wird, um die Langberührung von der Scroll-Geste zu unterscheiden"
---

# touch_drag

### Description

@short: Definiert den Zeitraum in Millisekunden, der verwendet wird, um die Langberührung von der Scroll-Geste zu unterscheiden

@signature: touch_drag: number | boolean

### Example

~~~jsx
gantt.config.touch_drag = 75;
...
gantt.init("gantt_here");
~~~

**Standardwert:** 500

### Details

Hinweis: Wenn Sie den Parameter auf *false* setzen, kann der Benutzer Aufgaben nicht ziehen.

### Related API
- [touch](api/config/touch.md)
- [touch_feedback](api/config/touch_feedback.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)