---
sidebar_label: link_radius
title: link_radius config
description: "控制时间轴中链接线角落的圆角半径"
---

# link_radius

### Description

@short: 控制时间轴中链接线角落的圆角半径

@signature: link_radius: number

### Example

~~~jsx
gantt.config.link_radius = 6;
gantt.init("gantt_here");
~~~

**Default value:** 4

### Details

此属性设置时间轴中链接线角落的圆角程度。当值为1或更小时，圆角效果将被关闭。如果链接段过短，无法容纳指定的半径，则该段链接不会应用圆角。

### Related API
- [link_line_width](api/config/link_line_width.md)
- [link_arrow_size](api/config/link_arrow_size.md)

### Change log
- 在v9.0版本中新增

