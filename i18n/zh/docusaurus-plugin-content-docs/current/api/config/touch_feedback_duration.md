---
sidebar_label: touch_feedback_duration
title: touch_feedback_duration 配置
description: "定义在触摸设备上拖放前后的振动反馈持续时间（以毫秒为单位）"
---

# touch_feedback_duration

### Description

@short: 定义在触摸设备上拖放前后的振动反馈持续时间（以毫秒为单位）

@signature: touch_feedback_duration: number

### Example

~~~jsx
gantt.config.touch_feedback_duration = 1;
...
gantt.init("gantt_here");
~~~

**默认值：** 1

### Details

已在版本 4.1 中添加

请注意，如果以下任一条件成立，该配置将无效：

1. 通过配置选项 [touch](api/config/touch.md) 禁用了触摸支持。
2. 浏览器不支持 [Vibration API](https://caniuse.com/vibration)。


### Related API
- [touch](api/config/touch.md)
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback](api/config/touch_feedback.md)