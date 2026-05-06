---
sidebar_label: getTaskCalendar
title: метод getTaskCalendar
description: "получает календарь, назначенный указанной задаче (календарь уровня задачи)"
---

# getTaskCalendar

### Description

@short: Получает календарь, назначенный указанной задаче (календарь уровня задачи)

@signature: getTaskCalendar: (task: *string | number | object) =\> any

### Parameters

- `task` - (required) *string | number | object* - идентификатор или объект задачи

### Returns
- ` task_calendar` - (object) - объект календаря задачи

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

Возвращаемый объект для приведенного выше примера — это [объект календаря](api/other/calendar.md). Если опция [work_time](api/config/work_time.md) отключена, метод возвращает календарь с включенным рабочим временем 24/7.

### Related API
- [getCalendar](api/method/getcalendar.md)
- [getCalendars](api/method/getcalendars.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md)