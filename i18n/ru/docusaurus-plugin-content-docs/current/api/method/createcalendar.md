---
sidebar_label: createCalendar
title: Метод createCalendar
description: "создает рабочий календарь"
---

# createCalendar

### Description

@short: Создает рабочий календарь

@signature: createCalendar: (parentCalendar?: Calendar) =\> Calendar

### Parameters

- `parentCalendar`	- (optional) *Calendar* - существующий календарь, который используется для создания нового на его основе		

### Returns
- ` calendar` - (Calendar) - объект Calendar

### Example

~~~jsx
// creating a full-time calendar (7 working days per week, 24 hours per day)
var calendar1 = gantt.createCalendar();

// creating a new calendar on the base of an existing one (copying it)
var calendar2 = gantt.createCalendar(parentCalendar);
~~~

### Details

добавлено в версии 4.2

После того как вы создали календарь, вам нужно добавить его в Gantt через метод [addCalendar](api/method/addcalendar.md):

~~~js
gantt.addCalendar(calendar1);
~~~

### Related API
- [addCalendar](api/method/addcalendar.md)
- [deleteCalendar](api/method/deletecalendar.md)
- [calendar](api/other/calendar.md)

### Related Guides
- [Расчет рабочего времени](guides/working-time.md#multipleworktimecalendars)