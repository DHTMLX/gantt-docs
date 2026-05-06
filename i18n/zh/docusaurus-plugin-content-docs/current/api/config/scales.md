---
sidebar_label: scales
title: scales config
description: "配置时间刻度的设置"
---

# scales

### Description

@short: 定义时间刻度的配置设置

@signature: scales: Scales

### Example

~~~jsx
gantt.config.scales = [
    { unit: "month", step: 1, format: "%F, %Y" },
    {
        unit: "week",
        step: 1,
        format: (date) => `Week #${gantt.date.getWeek(date)}`
    },
    {
        unit: "day",
        step: 1,
        format: "%D",
        css: (date) => !gantt.isWorkTime({ date, unit: "day" }) ? "weekend" : ""
    }
];
~~~

### Details

数组中的每个对象指定一个单独的刻度。对象可以包含以下属性：

- **unit** - (*string*) - 刻度单位的名称。可用值包括： "minute", "hour", "day"（默认）, "week", "quarter", "month", "year"。
此外还可以设置自定义单位。更多信息请参阅 [此处](guides/configuring-time-scale.md#customtimeunits)。
- **step?** - (*number*) - 时间刻度的步长（X 轴），默认值为 1。
- **format? (date): any** - (*string | Function*) - 刻度标签的格式。如果以函数形式设置，参数应为日期对象。
    - **_date_** - (*Date*) - 将被转换的日期
- **date? (date): any** - (*string | Function*) - 刻度标签的格式。如果以函数形式设置，参数应为日期对象。
    - **_date_** - (*Date*) - 将被转换的日期
- **css? (date): any** - 一个返回将应用于刻度单位的 CSS 类名的函数。接收一个日期对象作为参数。
    - **_date_** - (*Date*) - 将被检查的日期
- **sticky?** - (*boolean*) - 当刻度单元格的宽度大于视口宽度时，使刻度标签可见