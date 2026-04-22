---
sidebar_label: scale_unit
title: scale_unit config
description: "시간 축의 단위를 설정합니다 (X축)"
---

# scale_unit

:::warning
이 속성은 더 이상 사용되지 않습니다.
:::

### Description

@short: 시간 축의 단위를 설정합니다 (X축)

### Example

~~~jsx
gantt.config.scale_unit = "month";
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");
~~~

**Default value:** 'day'

### Related samples
- [월 보기](https://docs.dhtmlx.com/gantt/samples/03_scales/02_month_days.html)

### Details

사용자 정의 단위를 설정할 수 있습니다. 주제에 대한 자세한 내용은 [여기](guides/configuring-time-scale.md#customtimeunits)를 참고하세요.


:::note
 이 속성은 더 이상 사용되지 않습니다.
 [scales](api/config/scales.md)의 **unit** 속성을 대신 사용하세요:
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
- [스케일 설정 구성](guides/configuring-time-scale.md#timeunits)

### Change log
- v6.2부터 사용 중지되었습니다.