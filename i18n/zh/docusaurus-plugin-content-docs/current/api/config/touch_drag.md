---
sidebar_label: touch_drag
title: touch_drag 配置
description: "定义用于区分长按手势与滚动手势的时间间隔（单位：毫秒）"
---

# touch_drag

### Description

@short: 定义用于将长按手势与滚动手势区分开的毫秒级时间段

@signature: touch_drag: number | boolean

### Example

~~~jsx
gantt.config.touch_drag = 75;
...
gantt.init("gantt_here");
~~~

**默认值：** 500

### Details

注意，如果将参数设为 *false*，用户将无法拖动任务。

### Related API
- [touch](api/config/touch.md)
- [touch_feedback](api/config/touch_feedback.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)