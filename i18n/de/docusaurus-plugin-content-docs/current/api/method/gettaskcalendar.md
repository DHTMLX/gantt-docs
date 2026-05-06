---
sidebar_label: getTaskCalendar
title: getTaskCalendar Methode
description: "holt einen Kalender, der dem angegebenen Task zugewiesen ist (ein Kalender auf Aufgaben-Ebene)"
---

# getTaskCalendar

### Description

@short: Holt einen Kalender, der dem angegebenen Task zugewiesen ist (ein Kalender auf Aufgaben-Ebene)

@signature: getTaskCalendar: (task: *string | number | object) =\> any

### Parameters

- `task` - (required) *string | number | object* -        die ID oder das Objekt einer Aufgabe

### Returns
- `  task_calendar` - (object) - das Objekt des Kalenders der Aufgabe

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

Hinzugefügt in Version 4.2

Das zurückgegebene Objekt des obigen Beispiels ist ein [Kalender-Objekt](api/other/calendar.md). Wenn die [work_time](api/config/work_time.md) Option deaktiviert ist, gibt die Methode einen Kalender mit 24/7-Arbeitszeit zurück.

### Related API
- [getCalendar](api/method/getcalendar.md)
- [getCalendars](api/method/getcalendars.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md)