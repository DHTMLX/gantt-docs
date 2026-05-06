--- 
sidebar_label: createCalendar
title: createCalendar 方法
description: "创建一个工作日历"
---

# createCalendar

### Description

@short: 创建一个工作日历

@signature: createCalendar: (parentCalendar?: Calendar) =\> Calendar

### Parameters

- `parentCalendar` - (optional) *Calendar* - 一个用于在其基础上创建新日历的现有日历

### Returns
- `calendar` - (Calendar) - 日历对象

### Example

~~~jsx
// 设置一个全天候日历（每周7天工作，每天24小时）
var calendar1 = gantt.createCalendar();

// 通过复制已有日历创建新日历
var calendar2 = gantt.createCalendar(parentCalendar);
~~~

### Details

在版本 4.2 中新增

创建日历后，应通过 [addCalendar](api/method/addcalendar.md) 方法将其添加到 Gantt 中:

~~~js
gantt.addCalendar(calendar1);
~~~

### Related API
- [addCalendar](api/method/addcalendar.md)
- [deleteCalendar](api/method/deletecalendar.md)
- [calendar](api/other/calendar.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md#multipleworktimecalendars)