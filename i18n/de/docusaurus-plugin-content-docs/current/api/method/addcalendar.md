---
sidebar_label: addCalendar
title: addCalendar method
description: "fügt einen Kalender in das Gantt-Diagramm ein"
---

# addCalendar

### Description

@short: Fügt einen Kalender in das Gantt-Diagramm ein

@signature: addCalendar: (calendar: CalendarConfig) =\> string

### Parameters

- `calendar` - (required) *CalendarConfig* - ein Objekt, das die Konfiguration des Kalenders enthält

### Returns
- ` calendarId` - (string) - die Kennung des Kalenders

### Example

~~~jsx
// Hinzufügen eines bestehenden Kalenders
var calendarId = gantt.addCalendar(calendar);

// Hinzufügen eines Kalenders mit einer neuen Konfiguration
var calendarId = gantt.addCalendar({
    id:"custom", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: [ 1, 1, 1, 1, 1, 1 ,1]
    }
});

var calendar = gantt.getCalendar(calendarId);
~~~

### Related samples
- [Task level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/06_task_calendars.html)
- [Resource level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/07_resource_calendars.html)
- [Different worktimes for different time periods](https://docs.dhtmlx.com/gantt/samples/09_worktime/12_calendar_ranges.html)

### Details

Das Kalender-Konfigurationsobjekt kann die folgenden Eigenschaften enthalten:

- **id?** - (*string | number*) - optional, die Kennung des Kalenders
- **worktime?** - (*object*) - definiert die Arbeitstage und Arbeitszeiten. Es kann enthalten:
    - **_hours?_** - (*string[] | number[] | boolean*) - optional, ein Array zur Angabe globaler Arbeitszeiten, die Start- und Endzeiten der Aufgaben definieren
    - **_days?_** - (*WorkDaysTuple*) - optional, ein Array mit 7 Elementen, die die Wochentage repräsentieren (0 - Sonntag bis 6 - Samstag), wobei 1/true einen Arbeitstag und 0/false einen freien Tag bedeutet
    - **_customWeeks?_** - (*object*) - optional, ein Objekt, das unterschiedliche Arbeitszeitregelungen für verschiedene Zeiträume definiert. Es besteht aus Schlüssel-Wert-Paaren, wobei der Schlüssel der Name des Zeitraums ist und der Wert ein Objekt mit dessen Eigenschaften.
        - **_[timespan: string]_** - (*object*) - der Zeitraum mit seinen Arbeitszeiteinstellungen. Der Schlüssel dient als Name des Zeitraums.
            - **_from_** - (*Date*) - das Anfangsdatum des Zeitraums
            - **_to_** - (*Date*) - das Enddatum des Zeitraums
            - **_hours?_** - (*Array&lt;string | number&gt;*) - optional, ein Array von Arbeitszeitintervallen als 'von'-'bis' Paare. Ein Wert 'false' markiert einen freien Tag, während 'true' (Standard) die Standardzeiten (["8:00-17:00"]) anwendet
            - **_days?_** - (*WorkDaysTuple | boolean*) - optional, ein Array mit 7 Elementen, die die Wochentage repräsentieren (0 - Sonntag bis 6 - Samstag), wobei 1/true einen Arbeitstag und 0/false einen freien Tag anzeigt.


## Benutzerdefinierte Arbeitszeiten für einen bestimmten Tag festlegen

Anstatt nur die Tagesnummer der Woche anzugeben, ist es möglich, für diesen Tag benutzerdefinierte Arbeitszeiten einzustellen.<br>
Zum Beispiel: 

~~~js
const calendar = {
    id: "calendar1", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: [0, 1, 1, 1, ["12:00-17:00"], 1, 0]
    }
}
~~~

wobei ["12:00-17:00"] die Arbeitszeiten von 12:00 bis 17:00 Uhr für Donnerstag darstellen.

### Setting worktime for different time intervals

Es gibt die Möglichkeit, verschiedene Arbeitszeitregeln für unterschiedliche Zeiträume zu konfigurieren, indem man das Attribut **customWeeks** verwendet:

~~~js
gantt.addCalendar({
    id: "global", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1],
        customWeeks: {
            winter: {
                from: new Date(2025, 11, 1), // December 1st, 2025
                to: new Date(2026, 2, 1), // March 1st, 00:00, 2026
                hours: ["9:00-13:00", "14:00-16:00"],
                days: [1, 1, 1, 1, 0, 0, 0]
            }
        }
    }
});
~~~



### Setting worktime for certain dates

Sie können auch Arbeitszeiten für bestimmte Daten festlegen, indem Sie sie in der Eigenschaft **_dates_** des Objekts **_days_** setzen (sowohl für das **worktime**-Attribut als auch für die **customWeeks**-Eigenschaft). Zum Beispiel:  

~~~js
const calendar = {
    id: "calendar1", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: { 
            dates: { 
                "2025-04-09":  ["9:00-15:00"] 
            } 
        },
        customWeeks: {
            winter: {
                from: new Date(2025, 11, 1), // December 1st, 2025
                to: new Date(2026, 2, 1), // March 1st, 00:00, 2026
                hours: ["9:00-13:00", "14:00-16:00"],
                days: { 
                    dates: { 
                        "2026-01-02":  ["9:00-15:00"] 
                    } 
                }
            }
        }
    }
}
~~~



### Related API
- [getCalendar](api/method/getcalendar.md)
- [createCalendar](api/method/createcalendar.md)
- [deleteCalendar](api/method/deletecalendar.md)
- [calendar](api/other/calendar.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md#multipleworktimecalendars)

### Change log
- Die Funktion, das **_days_**-Attribut in Form eines Objekts zu setzen, das Wochentage und Daten enthält, wurde in v9.1 hinzugefügt
- Die Eigenschaft **customWeeks** wurde in v7.1 hinzugefügt;
- In Version 4.2 wurde es hinzugefügt