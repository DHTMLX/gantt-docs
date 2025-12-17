---
sidebar_label: scale_unit
title: scale_unit config
description: "X축 시간 스케일의 단위를 정의합니다."
---

# scale_unit

### Description

@short: X축 시간 스케일의 단위를 정의합니다.

### Example

~~~jsx
gantt.config.scale_unit = "month";
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");
~~~

**Default value:** 'day'

### Related samples
- [Month view](https://docs.dhtmlx.com/gantt/samples/03_scales/02_month_days.html)

### Details

시간 단위를 커스터마이징할 수 있습니다. 자세한 내용은 [이 섹션](guides/configuring-time-scale.md#customtimeunits)을 참고하세요.
<br>

:::note
 이 속성은 deprecated 되었습니다.
대신, [scales](api/config/scales.md) 내의 **unit** 속성을 사용하세요: 
:::

~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: weekScaleTemplate},
    {unit: "day", step: 1, format: "%D", css:daysStyle }
];
~~~

### Related API
- [date_scale](api/config/date_scale.md)
- [step](api/config/step.md)

### Related Guides
- [스케일 설정하기](guides/configuring-time-scale.md#settingtheunitofthescale)

### Change log
- v6.2부터 deprecated

