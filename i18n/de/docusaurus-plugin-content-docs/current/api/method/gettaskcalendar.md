---
sidebar_label: getTaskCalendar
title: getTaskCalendar method
description: "rufen Sie den mit einer bestimmten Aufgabe verknüpften Kalender ab (ein auf Aufgabenebene festgelegter Kalender)"
---

# getTaskCalendar

### Description

@short: Rufen Sie den mit einer bestimmten Aufgabe verknüpften Kalender ab (ein auf Aufgabenebene festgelegter Kalender)

@signature: getTaskCalendar: (task: any) =\> any

### Parameters

- `task` - (required) *string | number | object* -        die ID der Aufgabe oder das Aufgabenobjekt selbst

### Returns
- ` task_calendar` - (object) - das mit der Aufgabe verknüpfte Kalenderobjekt

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

Das im obigen Beispiel zurückgegebene Objekt entspricht einem [calendar object](api/other/calendar.md). Wenn die Option [work_time](api/config/work_time.md) deaktiviert ist, gibt die Methode standardmäßig einen Kalender mit 24/7 Arbeitszeiten zurück.

### Related API
- [getCalendar](api/method/getcalendar.md)
- [getCalendars](api/method/getcalendars.md)

### Related Guides
- ["Arbeitszeitberechnung"](guides/working-time.md#multipleworktimecalendars)

