---
sidebar_label: touch_feedback
title: touch_feedback 配置
description: "在触控设备上拖放前后提供振动反馈"
---

# touch_feedback

### Description

@short: 在触控设备上拖放前后提供振动反馈

@signature: touch_feedback: boolean

### Example

~~~jsx
gantt.config.touch_feedback = false;
...
gantt.init("gantt_here");
~~~

**默认值：** true

### Details

请注意，若满足以下任一条件，该配置将不生效：

1. 通过配置选项 [touch](api/config/touch.md) 禁用了触控支持。
2. 浏览器不支持 [Vibration API](https://caniuse.com/vibration)。

### Related API
- [touch](api/config/touch.md)
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)