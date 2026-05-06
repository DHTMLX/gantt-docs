---
sidebar_label: smart_scales
title: smart_scales config
description: "指定仅在屏幕上呈现时间刻度的可见部分"
---

# smart_scales

### Description

@short: 指定在屏幕上仅呈现时间刻度的可见部分

@signature: smart_scales: boolean

### Example

~~~jsx
gantt.config.smart_scales = true;
~~~

**默认值：** true

### Details

在 4.1 版本中新增

使用此配置可以显著加速图表渲染，尤其是在时间刻度非常长的情况下。

### Related Guides
- [性能：提升方法](guides/performance.md#common-techniques)