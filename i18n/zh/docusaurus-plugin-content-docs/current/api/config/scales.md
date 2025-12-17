---
sidebar_label: scales
title: scales config
description: "配置时间刻度的设置"
---

# scales

### Description

@short: 配置时间刻度的设置

@signature: scales: Scales

### Example

~~~jsx
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
    {unit: "week", step: 1, format: function (date) {
        return "Week #" + gantt.date.getWeek(date);
    }},
    {unit: "day", step: 1, format: "%D", css: function(date) {
    if(!gantt.isWorkTime({ date: date, unit: "day"})){
            return "weekend"
        }
    }}
];
~~~

### Details

数组中的每个条目代表一个单独的刻度。对象可以包含以下属性:

- **unit** - (*string*) - 指定刻度的单位。选项包括:"minute"、"hour"、"day"（默认）、"week"、"quarter"、"month"、"year"。
  也可以定义自定义单位。更多详情请参见 [here](guides/configuring-time-scale.md)。
- **step?** - (*number*) - 定义时间刻度（X轴）的步长，默认为1。
- **format? (date): any** - (*string | Function*) - 决定刻度标签的格式。如果提供函数，则该函数接收一个 date 对象。
    - **_date_** - (*Date*) - 需要格式化的日期
- **date? (date): any** - (*string | Function*) - 另一种指定刻度标签格式的方式，接受字符串或带有日期参数的函数。
    - **_date_** - (*Date*) - 需要格式化的日期
- **css? (date): any** - 一个函数，根据提供的日期返回要应用于刻度单元的 CSS 类名。
    - **_date_** - (*Date*) - 用于评估的日期
- **sticky?** - (*boolean*) - 当刻度单元宽度大于视口时，保持刻度标签可见
