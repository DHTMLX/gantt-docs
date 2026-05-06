---
sidebar_label: deleteCalendar
title: deleteCalendar Methode
description: "löscht einen Aufgabenkalender anhand seiner ID"
---

# deleteCalendar

### Description

@short: Löscht einen Aufgabenkalender anhand seiner ID

@signature: deleteCalendar: (id: string | number) =\> void

### Parameters

- `id` - (erforderlich) *string | number* - die ID des Kalenders

### Example

~~~jsx
// Hinzufügen eines Kalenders
gantt.addCalendar({
    id:"custom",
    worktime: {
        hours: [8, 17],
        days: [ 1, 1, 1, 1, 1, 1 ,1]
    }
});

// Löschen eines Kalenders
gantt.deleteCalendar("custom");
~~~

### Details

Hinzugefügt in Version 4.2

### Related API
- [addCalendar](api/method/addcalendar.md)
- [createCalendar](api/method/createcalendar.md)

### Related Guides
- [Arbeitszeitberechnung](guides/working-time.md#multipleworktimecalendars)