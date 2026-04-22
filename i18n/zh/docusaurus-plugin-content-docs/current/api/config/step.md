---
sidebar_label: step
title: step config
description: "定义时间刻度（X轴）的增量"
---

# step

:::warning
该属性已被废弃。
:::


### Description

@short: 设置时间刻度的步长（X 轴）

### Example

~~~jsx
gantt.config.scale_unit = "year";
gantt.config.step = 1;
gantt.config.date_scale = "%Y";

gantt.init("gantt_here");
~~~

### Related samples
- [Quarter scale 的 Step 配置](https://docs.dhtmlx.com/gantt/samples/03_scales/03_full_year.html)

### Details

:::note
**step** 属性已被废弃。请改用 [scales](api/config/scales.md) 的 **step** 属性：
:::

~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: weekScaleTemplate},
    {unit: "day", step: 1, format: "%D", css:daysStyle }
];
~~~

**默认值：** 1

### Related API
- [scale_unit](api/config/scale_unit.md)
- [date_scale](api/config/date_scale.md)

### Related Guides
- [Setting up Scale](guides/configuring-time-scale.md#timestep)

### Change log
- 自 v6.2 起已废弃