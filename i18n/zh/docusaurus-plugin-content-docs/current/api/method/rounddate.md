---
sidebar_label: roundDate
title: roundDate 方法
description: "将指定日期四舍五入到时间刻度上的最近日期"
---

# roundDate

### Description

@short: 将指定日期四舍五入到时间刻度上的最近日期

@signature: roundDate: (date: Date | RoundDateConfig) =\> Date

### Parameters

- `date` - (required) *Date | RoundDateConfig* - 将要进行四舍五入的 Date 对象，或带有设置的对象

### Returns
- `date` - (Date) - 四舍五入后的 Date 对象

### Example

~~~jsx
var today = gantt.roundDate(new Date());
~~~

### Details

如果需要将指定日期四舍五入到最近日期，请将 Date 对象作为参数传递给该方法：

~~~js
var today = gantt.roundDate(new Date());
console.log(today);
~~~

如果要根据时间单位将指定日期四舍五入到最近日期，请传递一个带设置的对象给 **roundDate()** 方法。该对象可包含以下属性：

- **date** - (*Date*) - 要进行四舍五入的 Date 对象；
- **unit?** - (*string*) - 时间单位（"minute", "hour", "day", "week", "month", "year"）；
- **step?** - (*number*) - 时间刻度（X-Axis）的步长，默认值为 1。

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