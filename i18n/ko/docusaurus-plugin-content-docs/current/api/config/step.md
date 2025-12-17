---
sidebar_label: step
title: step config
description: "시간 축(X축)의 증가 단위를 정의합니다."
---

# step

### Description

@short: 시간 축(X축)의 증가 단위를 정의합니다.

### Example

~~~jsx
gantt.config.scale_unit = "year";
gantt.config.step = 1;
gantt.config.date_scale = "%Y";

gantt.init("gantt_here");
~~~

**Default value:** 1

### Related samples
- [Step config for the Quarter scale](https://docs.dhtmlx.com/gantt/samples/03_scales/03_full_year.html)

### Details

:::note
 **step** 속성은 deprecated 되었습니다. 대신 [scales](api/config/scales.md)에서 **step**을 설정하세요: 
:::

~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: weekScaleTemplate},
    {unit: "day", step: 1, format: "%D", css:daysStyle }
];
~~~

### Related API
- [scale_unit](api/config/scale_unit.md)
- [date_scale](api/config/date_scale.md)

### Related Guides
- [스케일 설정하기](guides/configuring-time-scale.md#timestep)

### Change log
- v6.2부터 deprecated 되었습니다.

