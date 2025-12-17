---
sidebar_label: touch_drag
title: touch_drag config
description: "设置区分长按手势与滚动手势的时间周期，单位为毫秒"
---

# touch_drag

### Description

@short: 设置区分长按手势与滚动手势的时间周期，单位为毫秒

@signature: touch_drag: number | boolean

### Example

~~~jsx
gantt.config.touch_drag = 75;
...
gantt.init("gantt_here");
~~~

**Default value:** 500

### Details

请注意，如果将此参数设置为 *false*，用户将无法拖动任务。

### Related API
- [touch](api/config/touch.md)
- [touch_feedback](api/config/touch_feedback.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)

