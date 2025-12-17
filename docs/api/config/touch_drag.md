---
sidebar_label: touch_drag
title: touch_drag config
description: "defines the time period in milliseconds that is used to differ the long touch gesture from the scroll gesture"
---

# touch_drag

### Description

@short: Defines the time period in milliseconds that is used to differ the long touch gesture from the scroll gesture

@signature: touch_drag: number | boolean

### Example

~~~jsx
gantt.config.touch_drag = 75;
...
gantt.init("gantt_here");
~~~

**Default value:** 500

### Details

Note, if you set the parameter to *false*, the user won't be able to drag tasks.

### Related API
- [touch](api/config/touch.md)
- [touch_feedback](api/config/touch_feedback.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)

