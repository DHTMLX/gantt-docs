---
sidebar_label: createCalendar
title: createCalendar method
description: "creates a working calendar"
---

# createCalendar

### Description

@short: Creates a working calendar

@signature: createCalendar: (parentCalendar?: Calendar) =\> Calendar

### Parameters

- `parentCalendar`	- (optional) *Calendar* - an existing calendar that is used for creating a new one on the base of it		

### Returns
- ` calendar` - (Calendar) - the Calendar object

### Example

~~~jsx
// creating a full-time calendar (7 working days per week, 24 hours per day)
var calendar1 = gantt.createCalendar();

// creating a new calendar on the base of an existing one (copying it)
var calendar2 = gantt.createCalendar(parentCalendar);
~~~

### Details

added in version 4.2

After you've created a calendar, you need to add it into Gantt via the [addCalendar](api/method/addcalendar.md) method:

~~~js
gantt.addCalendar(calendar1);
~~~

### Related API
- [addCalendar](api/method/addcalendar.md)
- [deleteCalendar](api/method/deletecalendar.md)
- [calendar](api/other/calendar.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md#multipleworktimecalendars)

