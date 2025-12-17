---
sidebar_label: roundDate
title: roundDate method
description: "根据时间刻度将给定日期舍入到最接近的日期"
---

# roundDate

### Description

@short: 根据时间刻度将给定日期舍入到最接近的日期

@signature: roundDate: (date: Date | RoundDateConfig) =\> Date

### Parameters

- `date` - (required) *Date | RoundDateConfig* -     要舍入的 Date 对象或包含配置选项的对象

### Returns
- ` date` - (Date) - 舍入后的 Date 对象

### Example

~~~jsx
var today = gantt.roundDate(new Date());
~~~

### Details

要将特定日期舍入到最接近的日期，只需将 Date 对象传递给此方法:

~~~js
var today = gantt.roundDate(new Date());
console.log(today);
~~~

如果您想根据特定时间单位来舍入日期，可以使用带有设置的对象作为 **roundDate()** 方法的参数。该对象可以包含以下属性:

- **date** - (*Date*) - 要舍入的 Date 对象；
- **unit?** - (*string*) - 用于舍入的时间单位（"minute", "hour", "day", "week", "month", "year"）；
- **step?** - (*number*) - 时间刻度（X轴）的间隔步长，默认值为 1。

~~~js
var today = gantt.roundDate({
    date: new Date(),
    unit: "hour",
    step: 1   
});
console.log(today);
~~~

### Related API
- [roundTaskDates](api/method/roundtaskdates.md)

