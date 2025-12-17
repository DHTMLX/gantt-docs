---
sidebar_label: touch_feedback_duration
title: touch_feedback_duration config
description: "defines the duration of vibration feedback before/after drag and drop on touch devices (in milliseconds)"
---

# touch_feedback_duration

### Description

@short: Defines the duration of vibration feedback before/after drag and drop on touch devices (in milliseconds)

@signature: touch_feedback_duration: number

### Example

~~~jsx
gantt.config.touch_feedback_duration = 1;
...
gantt.init("gantt_here");
~~~

**Default value:** 1

### Details

added in version 4.1 

Note, the config will have no effect if: 

1. The touch support is disabled by the configuration option [touch](api/config/touch.md).
2. The browser doesn't support the [Vibration API](https://caniuse.com/vibration).

### Related API
- [touch](api/config/touch.md)
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback](api/config/touch_feedback.md)

