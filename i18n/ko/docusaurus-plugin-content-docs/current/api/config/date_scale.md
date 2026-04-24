---
sidebar_label: date_scale
title: date_scale 설정
description: "시간 축(X축)의 형식을 설정합니다"
---

# date_scale

:::warning
해당 속성은 더 이상 사용되지 않습니다.
:::

### Description

@short: 시간 축(X축)의 형식을 설정합니다

### Example

~~~jsx
gantt.config.scale_unit = "month";
gantt.config.step = 1;
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");
~~~

**Default value:** "%d %M"

### Related samples
- [다중 스케일](https://docs.dhtmlx.com/gantt/samples/03_scales/01_multiple_scales.html)

### Details

:::note
**date_scale** 속성은 더 이상 사용되지 않습니다. 대신 [scales](api/config/scales.md)의 **format** 속성을 사용하세요:
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
- [step](api/config/step.md)

### Related Guides
- [스케일 설정 방법](guides/configuring-time-scale.md#dateformat)
- [날짜 포맷 명세](guides/date-format.md)

### Change log
- v6.2부터 더 이상 사용되지 않습니다.