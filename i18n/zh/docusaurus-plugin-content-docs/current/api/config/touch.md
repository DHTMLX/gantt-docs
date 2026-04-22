---
sidebar_label: touch
title: touch config
description: "控制甘特图是否启用或禁用 touch 支持"
---

# touch

### Description

@short: 启用/禁用甘特图的触控支持

@signature: touch: boolean | string

### Example

~~~jsx
gantt.config.touch = "force";
...
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

作为一个字符串，该参数只能取一个值 - **'force'**。

因此，该参数共有 3 种可能的取值：

- *true* - dhtmlxGantt 通过分析浏览器的 user-agent 字符串来尝试检测是否存在触控设备；若检测到触控设备，则启用触控支持。
- *'force'* - 启用持续的触控支持，无论使用何种设备。
- *false* - 关闭触控支持。

### Related API
- [touch_drag](api/config/touch_drag.md)
- [touch_feedback](api/config/touch_feedback.md)
- [touch_feedback_duration](api/config/touch_feedback_duration.md)