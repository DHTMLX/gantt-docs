---
sidebar_label: time_picker
title: time_picker 配置
description: "设置 lightbox 中时间下拉选择器的格式"
---

# time_picker

### Description

@short: 设置 lightbox 中时间下拉选择器的格式

@signature: time_picker: string

### Example

~~~jsx
gantt.config.time_picker = "%H:%s";

gantt.init("gantt_here");
~~~

**默认值：** "%H:%i"

### Related API
- [time_picker](api/template/time_picker.md)

### Related Guides
- [日期格式规范](guides/date-format.md)