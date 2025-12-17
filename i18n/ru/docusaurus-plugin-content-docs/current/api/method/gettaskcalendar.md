---
sidebar_label: getTaskCalendar
title: getTaskCalendar method
description: "получает календарь, связанный с конкретной задачей (календарь, установленный на уровне задачи)"
---

# getTaskCalendar

### Description

@short: Получает календарь, связанный с конкретной задачей (календарь, установленный на уровне задачи)

@signature: getTaskCalendar: (task: any) =\> any

### Parameters

- `task` - (required) *string | number | object* -        id задачи или сам объект задачи

### Returns
- ` task_calendar` - (object) - объект календаря, связанный с задачей

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

добавлено в версии 4.2

Объект, возвращаемый в примере выше, соответствует [объекту календаря](api/other/calendar.md). Когда опция [work_time](api/config/work_time.md) отключена, метод по умолчанию возвращает календарь с рабочим временем 24/7.

### Related API
- [getCalendar](api/method/getcalendar.md)
- [getCalendars](api/method/getcalendars.md)

### Related Guides
- [Расчёт рабочего времени](guides/working-time.md#multipleworktimecalendars)

