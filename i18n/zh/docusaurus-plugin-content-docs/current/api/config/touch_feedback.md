---
sidebar_label: touch_feedback
title: touch_feedback config
description: "在触摸设备上启用拖放操作前或后的振动反馈"
---

# touch_feedback

### Description

@short: 在触摸设备上启用拖放操作前或后的振动反馈

@signature: touch_feedback: boolean

### Example

~~~jsx
gantt.config.touch_feedback = false;
...
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

请注意，如果满足以下任一条件，该设置将不会生效:

1. 使用 [touch](api/config/touch.md) 选项关闭了触摸支持。
2. 浏览器不支持 [Vibration API](https://caniuse.com/vibration)。

### Related API
- [touch](api/config/touch.md)
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)

