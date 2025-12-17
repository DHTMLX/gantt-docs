---
sidebar_label: getCalendar
title: getCalendar method
description: "rufen Sie einen Arbeitszeitkalender anhand seiner ID ab"
---

# getCalendar

### Description

@short: Rufen Sie einen Arbeitszeitkalender anhand seiner ID ab

@signature: getCalendar: (calendarId?: string | number) =\> Calendar

### Parameters
- `calendarId` - (optionale) *string | number* - optionale ID des globalen Kalenders oder "global"

### Returns
- ` config` - (Calendar) - das Kalenderobjekt

### Example

~~~jsx
var calendar = gantt.getCalendar(calendarId);
~~~

### Details

Das im obigen Beispiel zurückgegebene Objekt ist ein [Kalenderobjekt](api/other/calendar.md).

Die Standardarbeitszeit ist wie folgt festgelegt:

- Arbeitstage sind von Montag bis Freitag.
- Arbeitszeiten sind von 08:00 bis 17:00.

### Related API
- [getCalendars](api/method/getcalendars.md)
- [getTaskCalendar](api/method/gettaskcalendar.md)

### Related Guides
- ["Arbeitszeitberechnung"](guides/working-time.md#multipleworktimecalendars)

### Change log
- hinzugefügt in Version 4.2

