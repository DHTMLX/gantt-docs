---
sidebar_label: getCalendar
title: getCalendar method
description: "gets worktime calendar by id"
---

# getCalendar

### Description

@short: Gets worktime calendar by id

@signature: getCalendar: (calendarId?: string | number) =\> Calendar

### Parameters

-  `calendarId` -	(string | number) -	optional, the id of the global calendar or "global"

### Returns
- ` config` - (Calendar) - calendar object

### Example

~~~jsx
var calendar = gantt.getCalendar(calendarId);
~~~

### Details

The returned object for the above example is a [calendar object](api/other/calendar.md).

The default working time is the following:

- Working days are from Monday to Friday.
- Working hours are from 08:00 to 17:00.

### Related API
- [getCalendars](api/method/getcalendars.md)
- [getTaskCalendar](api/method/gettaskcalendar.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md)

### Change log
- added in version 4.2

