---
sidebar_label: date_scale
title: date_scale config
description: "시간 축(X축)의 형식을 설정합니다."
---

# date_scale

### Description

@short: 시간 축(X축)의 형식을 설정합니다.

### Example

~~~jsx
gantt.config.scale_unit = "month";
gantt.config.step = 1;
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");
~~~

**Default value:** "%d %M"

### Related samples
- [Multiple scales](https://docs.dhtmlx.com/gantt/samples/03_scales/01_multiple_scales.html)

### Details

:::note
 **date_scale** 속성은 deprecated 되었습니다. 대신 [scales](api/config/scales.md)에 설명된 **format** 속성을 사용하세요: 
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
- [스케일 설정하기](guides/configuring-time-scale.md#settingthescalesformat)
- [날짜 형식 지정](guides/date-format.md)

### Change log
- v6.2부터 deprecated 되었습니다.

