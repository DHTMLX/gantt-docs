---
sidebar_label: link_radius
title: link_radius 配置
description: "在时间轴中设置链接线圆角的半径"
---

# link_radius

### Description

@short: 设置时间轴中链接线拐角的圆角半径

@signature: link_radius: number

### Example

~~~jsx
gantt.config.link_radius = 6;
gantt.init("gantt_here");
~~~

**默认值：** 4

### Details

该属性定义时间轴中链接线拐角的圆角半径。若该值小于或等于1，则禁用圆角。如果某个链接段的长度不足以容纳所指定的半径，则不会对该段应用圆角。

### Related API
- [link_line_width](api/config/link_line_width.md)
- [link_arrow_size](api/config/link_arrow_size.md)

### Change log
- 在 v9.0 版本中新增