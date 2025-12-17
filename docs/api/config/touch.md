---
sidebar_label: touch
title: touch config
description: "enables/disables the touch support for the Gantt chart"
---

# touch

### Description

@short: Enables/disables the touch support for the Gantt chart

@signature: touch: boolean | string

### Example

~~~jsx
gantt.config.touch = "force";
...
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

As a string, the parameter can take the only value - **'force'**.

So, there are 3 possible values that the parameter can take:

- *true* - dhtmlxGantt tries to detect the touch device by analyzing the user-agent string of the browser and, if a  touch device is detected, enables the touch support.
- *'force'* - enables the persistent touch support, no matter what kind of device is used.
- *false* - disables the touch support.

### Related API
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback](api/config/touch_feedback.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)

