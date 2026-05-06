---
sidebar_label: createCalendar
title: createCalendar Methode
description: "erstellt einen Arbeitskalender"
---

# createCalendar

### Description

@short: Erstellt einen Arbeitskalender

@signature: createCalendar: (parentCalendar?: Calendar) =\> Calendar

### Parameters

- `parentCalendar`	- (optional) *Calendar* - ein vorhandener Kalender, der als Grundlage für die Erstellung eines neuen Kalenders verwendet wird			

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

Hinzugefügt in Version 4.2

Nachdem Sie einen Kalender erstellt haben, müssen Sie ihn in Gantt über die [addCalendar](api/method/addcalendar.md) Methode hinzufügen:

~~~js
gantt.addCalendar(calendar1);
~~~

### Related API
- [addCalendar](api/method/addcalendar.md)
- [deleteCalendar](api/method/deletecalendar.md)
- [calendar](api/other/calendar.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md#multipleworktimecalendars)