---
sidebar_label: mergeCalendars
title: mergeCalendars method
description: "vereinigt mehrere Arbeitskalender zu einem"
---

# mergeCalendars

### Description

@short: Führt mehrere Arbeitskalender zu einem zusammen

@signature: mergeCalendars: (calendars: Calendar[] | Calendar, calendar2?: Calendar) =\> void

### Parameters

- `calendars` - (erforderlich) *Calendar[] | Calendar* -    -    ein Array von Kalenderobjekten oder das erste Kalenderobjekt
-  `calendar2` -    (optional) *Calendar*   -     Optional, das zweite Kalenderobjekt

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

Sie können auch eine Menge von [Kalender-Objekten](api/other/calendar.md) als Parameter der **mergeCalendars**-Methode angeben:

~~~js
// verwenden von Kalendern als Argumente
const joinedCalendar = gantt.mergeCalendars(
    gantt.getCalendar(mikeCalendarId),
    gantt.getCalendar(johnCalendarId)
);
~~~

## Logic for merging calendars

Beim Zusammenführen von Kalendern gilt folgende Logik: Der Wochentag im neuen Kalender wird nur dann als Arbeitstag (1/wahr) gezählt, wenn er in allen zusammengeführten Kalendern ein Arbeitstag ist (Logical AND (&&)):

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

**Related sample:** [Gantt. Merge work calendars (via mergeCalendars() method)](https://snippet.dhtmlx.com/56vubu7a)

:::note
Die Logik berücksichtigt keine [customWeeks](api/method/addcalendar.md).
:::

### Related API
- [calendar](api/other/calendar.md)
- [getCalendar](api/method/getcalendar.md)
- [getResourceCalendar](api/method/getresourcecalendar.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md#assigningcalendartoresource)

### Change log
- hinzugefügt in v7.0