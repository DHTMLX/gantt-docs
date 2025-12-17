---
sidebar_label: autosize_min_width
title: autosize_min_width config
description: "定义在使用水平 'autosize' 模式时，甘特图的最小宽度（以像素为单位）"
---

# autosize_min_width

### Description

@short: 定义在使用水平 'autosize' 模式时，甘特图的最小宽度（以像素为单位）

@signature: autosize_min_width: number

### Example

~~~jsx
gantt.config.autosize = "xy";
gantt.config.autosize_min_width = 800;

gantt.init("gantt_here");
~~~

**Default value:** 零 (0)

### Details

水平 'autosize' 模式可以通过 [autosize](api/config/autosize.md) 选项启用。

### Related API
- [autosize](api/config/autosize.md)

