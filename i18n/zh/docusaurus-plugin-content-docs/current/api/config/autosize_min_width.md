---
sidebar_label: autosize_min_width
title: autosize_min_width 配置
description: "设置 Gantt 图在水平 'autosize' 模式下可以占用的最小宽度（以像素为单位）"
---

# autosize_min_width

### Description

@short: 设置 Gantt 图在水平 'autosize' 模式下可占用的最小宽度（以像素为单位）

@signature: autosize_min_width: number

### Example

~~~jsx
gantt.config.autosize = "xy";
gantt.config.autosize_min_width = 800;

gantt.init("gantt_here");
~~~

**默认值：** 0

### Details

水平 'autosize' 模式通过 [autosize](api/config/autosize.md) 选项启用。

### Related API
- [autosize](api/config/autosize.md)