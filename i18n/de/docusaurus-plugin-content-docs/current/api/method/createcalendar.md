---
sidebar_label: createCalendar
title: createCalendar method
description: "erstellt einen funktionalen Kalender"
---

# createCalendar

### Description

@short: Erstellt einen funktionalen Kalender

@signature: createCalendar: (parentCalendar?: Calendar) =\> Calendar

### Parameters
- `parentCalendar` - (optional) *Calendar* - ein bestehender Kalender, auf dem der neue basieren soll

### Returns
- ` calendar` - (Calendar) - das Calendar-Objekt

### Example

~~~jsx
// Einrichtung eines Vollzeitkalenders (7 Arbeitstage pro Woche, 24 Stunden pro Tag)
var calendar1 = gantt.createCalendar();

// Erstellen eines neuen Kalenders durch Kopieren eines bestehenden
var calendar2 = gantt.createCalendar(parentCalendar);
~~~

### Details

hinzugefügt in Version 4.2

Nachdem ein Kalender erstellt wurde, sollte er mit der [addCalendar](api/method/addcalendar.md) Methode zu Gantt hinzugefügt werden:

~~~js
gantt.addCalendar(calendar1);
~~~

### Related API
- [addCalendar](api/method/addcalendar.md)
- [deleteCalendar](api/method/deletecalendar.md)
- [calendar](api/other/calendar.md)

### Related Guides
- ["Arbeitszeitberechnung"](guides/working-time.md#multipleworktimecalendars)

