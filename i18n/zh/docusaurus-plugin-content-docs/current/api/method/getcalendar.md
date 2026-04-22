---
sidebar_label: getCalendar
title: getCalendar 方法
description: "通过 ID 获取工作时间日历"
---

# getCalendar

### Description

@short: 按 ID 获取工作时间日历

@signature: getCalendar: (calendarId?: string | number) =\> Calendar

### Parameters

-  `calendarId` -	(string | number) -	可选，是全局日历的 ID，或 "global"

### Returns
- `config` - (Calendar) - 日历对象

### Example

~~~jsx
var calendar = gantt.getCalendar(calendarId);
~~~

### Details

上述示例返回的对象是一个 [日历对象](api/other/calendar.md)。

默认工作时间如下：

- 工作日为星期一至星期五。
- 工作时段为 08:00 至 17:00。

### Related API
- [getCalendars](api/method/getcalendars.md)
- [getTaskCalendar](api/method/gettaskcalendar.md)

### Related Guides
- [工作时间计算](guides/working-time.md)

### Change log
- 在版本 4.2 中新增