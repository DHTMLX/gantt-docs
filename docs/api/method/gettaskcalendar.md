---
sidebar_label: getTaskCalendar
title: getTaskCalendar method
description: "gets a calendar assigned to the specified task (a task level calendar)"
---

# getTaskCalendar

### Description

@short: Gets a calendar assigned to the specified task (a task level calendar)

@signature: getTaskCalendar: (task: *string | number | object) =\> any

### Parameters

- `task` - (required) *string | number | object* -        the id or object of a task

### Returns
- ` task_calendar` - (object) - the object of the task's calendar

### Example

~~~jsx
const task_calendar = gantt.getTaskCalendar({
    "id":2, 
    "calendar_id":"custom", 
    "text":"Task #1", 
    "start_date":"02-04-2013",
    "parent":"1", 
    "progress":0.5, 
    "open": true
});

gantt.getTaskCalendar(2);
~~~

### Related samples
- [Task level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/06_task_calendars.html)

### Details

added in version 4.2

The returned object for the above example is a [calendar object](api/other/calendar.md). If the [work_time](api/config/work_time.md) option is disabled, method returns calendar with 24/7 working time enabled.

### Related API
- [getCalendar](api/method/getcalendar.md)
- [getCalendars](api/method/getcalendars.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md)

