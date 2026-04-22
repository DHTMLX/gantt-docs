---
sidebar_label: step
title: 단계 구성
description: "시간 축의 눈금 간격을 설정합니다 (X축)"
---

# step

:::warning
경고: 이 속성은 더 이상 권장되지 않습니다.
:::

### Description

@short: 시간 축의 눈금 간격을 설정합니다 (X축)

### Example

~~~jsx
gantt.config.scale_unit = "year";
gantt.config.step = 1;
gantt.config.date_scale = "%Y";

gantt.init("gantt_here");
~~~

### Related samples
- [Step config for the Quarter scale](https://docs.dhtmlx.com/gantt/samples/03_scales/03_full_year.html)

### Details

:::note
**step** 속성은 더 이상 권장되지 않습니다. 대신 [scales](api/config/scales.md)의 **step** 속성을 사용하세요:
:::

~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: weekScaleTemplate},
    {unit: "day", step: 1, format: "%D", css:daysStyle }
];
~~~

**기본 값:** 1

### Related API
- [scale_unit](api/config/scale_unit.md)
- [date_scale](api/config/date_scale.md)

### Related Guides
- [Setting up Scale](guides/configuring-time-scale.md#timestep)

### Change log
- v6.2부터 더 이상 사용되지 않음