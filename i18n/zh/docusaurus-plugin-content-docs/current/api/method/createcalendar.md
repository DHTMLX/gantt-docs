---
sidebar_label: createCalendar
title: createCalendar method
description: "设置一个功能完整的日历"
---

# createCalendar

### Description

@short: 设置一个功能完整的日历

@signature: createCalendar: (parentCalendar?: Calendar) =\> Calendar

### Parameters

- `parentCalendar` - (optional) *Calendar* - （可选）基于已有日历创建新日历

### Returns
- ` calendar` - (Calendar) - 返回 Calendar 对象

### Example

~~~jsx
// 设置一个全天候日历（每周7天工作，每天24小时）
var calendar1 = gantt.createCalendar();

// 通过复制已有日历创建新日历
var calendar2 = gantt.createCalendar(parentCalendar);
~~~

### Details

版本4.2新增

创建日历后，应通过 [addCalendar](api/method/addcalendar.md) 方法将其添加到 Gantt 中:

~~~js
gantt.addCalendar(calendar1);
~~~

### Related API
- [addCalendar](api/method/addcalendar.md)
- [deleteCalendar](api/method/deletecalendar.md)
- [calendar](api/other/calendar.md)

### Related Guides
- [工作时间计算](guides/working-time.md)

