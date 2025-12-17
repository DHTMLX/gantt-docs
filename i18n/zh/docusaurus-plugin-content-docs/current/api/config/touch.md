---
sidebar_label: touch
title: touch config
description: "控制甘特图是否启用或禁用 touch 支持"
---

# touch

### Description

@short: 控制甘特图是否启用或禁用 touch 支持

@signature: touch: boolean | string

### Example

~~~jsx
gantt.config.touch = "force";
...
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

当设置为字符串时，唯一接受的值是 **'force'**。

<br>

该参数有三种可能的选项:

- *true* - dhtmlxGantt 会通过检查浏览器的 user-agent 字符串来尝试检测设备是否支持 touch，如果检测到支持 touch 的设备，则启用 touch 支持。
- *'force'* - 无论使用何种设备，都强制启用 touch 支持。
- *false* - 完全禁用 touch 支持。

### Related API
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback](api/config/touch_feedback.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)

