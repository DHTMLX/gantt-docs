---
sidebar_label: mergeCalendars
title: mergeCalendars method
description: "kombiniert mehrere Arbeitskalender zu einem einzigen Kalender"
---

# mergeCalendars

### Description

@short: Kombiniert mehrere Arbeitskalender zu einem einzigen Kalender

@signature: mergeCalendars: (calendars: Calendar[] | Calendar, calendar2?: Calendar) =\> void

### Parameters
- `calendars` - (required) *Calendar[] | Calendar* -       entweder ein Array von Kalenderobjekten oder ein einzelnes Kalenderobjekt
- `calendar2` - (optional) *Calendar* - optional, ein zweites Kalenderobjekt

### Example

~~~jsx
const johnCalendarId = gantt.addCalendar({
    worktime: {
        hours: ["0:00-24:00"],
        days: [0, 1, 1, 1, 1, 1, 0]
    }
});
const mikeCalendarId = gantt.addCalendar({
    worktime: {
        hours: ["8:00-12:00", "13:00-17:00"],
        days: [0, 1, 1, 1, 1, 1, 0]
    }
});

// Übergabe eines Arrays von Kalendern zum Zusammenführen
const joinedCalendar = gantt.mergeCalendars([
    gantt.getCalendar(mikeCalendarId),
    gantt.getCalendar(johnCalendarId)
]);
~~~

### Details

Sie können auch mehrere Kalenderobjekte als separate Parameter an die Methode **mergeCalendars** übergeben:

~~~js
// Kalender als separate Argumente übergeben
const joinedCalendar = gantt.mergeCalendars(
    gantt.getCalendar(mikeCalendarId),
    gantt.getCalendar(johnCalendarId)
);
~~~

## Funktionsweise des Zusammenführens von Kalendern

Beim Zusammenführen von Kalendern werden die Arbeitstage des resultierenden Kalenders ermittelt, indem geprüft wird, ob jeder Tag in allen zusammengeführten Kalendern ein Arbeitstag ist (unter Verwendung einer logischen UND-Operation (&&)):

~~~html
// kalender 1 + kalender 2 = zusammengeführter kalender;

// Fall 1: 
// Arbeitstag (1/wahr) + Arbeitstag (1/wahr) = Arbeitstag (1/wahr);

// Fall 2: 
// Arbeitstag (1/wahr) + kein Arbeitstag (0/falsch) = kein Arbeitstag (0/falsch);

// Fall 3: 
// kein Arbeitstag (0/falsch) + kein Arbeitstag (0/falsch) = kein Arbeitstag (0/falsch);
~~~

Beispiel mit zwei Kalendern:

- Der erste Kalender hat Arbeitstage am Montag und Mittwoch:

~~~js
const calendar1Id = gantt.addCalendar({
    id: "calendar1",
    worktime: {
        days: [ 0, 1, 0, 1, 0, 0, 0 ]
    }
});
~~~

- Der zweite Kalender hat Arbeitstage am Montag, Dienstag und Donnerstag:

~~~js
const calendar2Id = gantt.addCalendar({
    id: "calendar2",
    worktime: {
        days: [ 0, 1, 1, 0, 1, 0, 0 ]
    }
});
~~~

Das Zusammenführen dieser Kalender:

~~~js
const joinedCalendar = gantt.mergeCalendars([
    gantt.getCalendar(calendar1Id),
    gantt.getCalendar(calendar2Id)
]);
~~~

ergibt einen Kalender, bei dem nur Montag ein Arbeitstag ist:

~~~html
// Tage: [ 0, 1, 0, 1, 0, 0, 0 ]

// +

// Tage: [ 0, 1, 1, 0, 1, 0, 0 ]

// =

// Tage: [ 0, 1, 0, 0, 0, 0, 0 ]
~~~

**Verwandtes Beispiel:** [Gantt. Merge work calendars (via mergeCalendars() method)](https://snippet.dhtmlx.com/56vubu7a)

:::note
 Die Zusammenführungslogik berücksichtigt keine [customWeeks](api/method/addcalendar.md). 
:::

### Related API
- [calendar](api/other/calendar.md)
- [getCalendar](api/method/getcalendar.md)
- [getResourceCalendar](api/method/getresourcecalendar.md)

### Related Guides
- ["Arbeitszeitberechnung"](guides/working-time.md#assigningcalendartoresource)

### Change log
- hinzugefügt in v7.0

