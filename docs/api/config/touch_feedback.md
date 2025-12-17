---
sidebar_label: touch_feedback
title: touch_feedback config
description: "returns vibration feedback before/after drag and drop on touch devices"
---

# touch_feedback

### Description

@short: Returns vibration feedback before/after drag and drop on touch devices

@signature: touch_feedback: boolean

### Example

~~~jsx
gantt.config.touch_feedback = false;
...
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

Note, the config will have no effect if: 

1. The touch support is disabled by the configuration option [touch](api/config/touch.md).
2. The browser doesn't support the [Vibration API](https://caniuse.com/vibration).

### Related API
- [touch](api/config/touch.md)
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)

