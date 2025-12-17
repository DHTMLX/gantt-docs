---
sidebar_label: getCalendar
title: getCalendar method
description: "通过其ID获取工作时间日历"
---

# getCalendar

### Description

@short: 通过其ID获取工作时间日历

@signature: getCalendar: (calendarId?: string | number) =\> Calendar

### Parameters

- `calendarId` - (optional) *string | number* -        可选，全局日历的ID或 "global"

### Returns
- ` config` - (Calendar) - 返回日历对象

### Example

~~~jsx
var calendar = gantt.getCalendar(calendarId);
~~~

### Details

上面示例中返回的对象是一个[日历对象](api/other/calendar.md)。

默认的工作时间设置如下:

- 工作日为周一至周五。
- 工作时间为08:00至17:00。

### Related API
- [getCalendars](api/method/getcalendars.md)
- [getTaskCalendar](api/method/gettaskcalendar.md)

### Related Guides
- [工作时间计算](guides/working-time.md)

### Change log
- 版本4.2中添加

