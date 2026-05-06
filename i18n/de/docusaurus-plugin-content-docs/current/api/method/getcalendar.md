---
sidebar_label: getCalendar
title: getCalendar Methode
description: "holt den Arbeitszeitkalender anhand der ID"
---

# getCalendar

### Description

@short: Holt den Arbeitszeitkalender anhand der ID

@signature: getCalendar: (calendarId?: string | number) =\> Calendar

### Parameters

-  `calendarId` - (string | number) - optional, die ID des globalen Kalenders oder "global"

### Returns
- ` config` - (Calendar) - Kalender-Objekt

### Example

~~~jsx
var calendar = gantt.getCalendar(calendarId);
~~~

### Details

Das zurückgegebene Objekt für das obige Beispiel ist ein [Kalender-Objekt](api/other/calendar.md).

Die Standard-Arbeitszeit ist wie folgt:

- Arbeitstage sind von Montag bis Freitag.
- Arbeitszeiten sind von 08:00 bis 17:00.

### Related API
- [getCalendars](api/method/getcalendars.md)
- [getTaskCalendar](api/method/gettaskcalendar.md)

### Related Guides
- [Berechnung der Arbeitszeit](guides/working-time.md)

### Change log
- Hinzugefügt in Version 4.2