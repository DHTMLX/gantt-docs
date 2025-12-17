---
sidebar_label: touch_feedback_duration
title: touch_feedback_duration config
description: "指定触摸设备上拖放操作前后振动反馈持续的时间（以毫秒为单位）"
---

# touch_feedback_duration

### Description

@short: 指定触摸设备上拖放操作前后振动反馈持续的时间（以毫秒为单位）

@signature: touch_feedback_duration: number

### Example

~~~jsx
gantt.config.touch_feedback_duration = 1;
...
gantt.init("gantt_here");
~~~

**Default value:** 1

### Details

该配置项自版本4.1引入

请注意，如果满足以下条件，该设置将不起作用:

1. 使用[touch](api/config/touch.md)配置选项关闭了触摸支持。
2. 浏览器不支持[Vibration API](https://caniuse.com/vibration)。

### Related API
- [touch](api/config/touch.md)
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback](api/config/touch_feedback.md)

