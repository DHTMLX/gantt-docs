---
sidebar_label: smart_scales
title: smart_scales config
description: "指定仅在屏幕上绘制时间刻度的可见部分"
---

# smart_scales

### Description

@short: 指定仅在屏幕上绘制时间刻度的可见部分

@signature: smart_scales: boolean

### Example

~~~jsx
gantt.config.smart_scales = true;
~~~

**Default value:** true

### Details

在版本 4.1 中新增

启用此设置可以大幅提升图表的渲染性能，特别是在处理非常长的时间刻度时。

### Related Guides
- [性能优化:提升方法](guides/performance.md)
