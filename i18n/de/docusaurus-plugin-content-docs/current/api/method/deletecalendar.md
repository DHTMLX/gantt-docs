---
sidebar_label: deleteCalendar
title: deleteCalendar method
description: "entfernt einen Task-Kalender anhand seiner ID"
---

# deleteCalendar

### Description

@short: Entfernt einen Task-Kalender anhand seiner ID

@signature: deleteCalendar: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -         die ID des Kalenders

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

eingeführt in Version 4.2

### Related API
- [addCalendar](api/method/addcalendar.md)
- [createCalendar](api/method/createcalendar.md)

### Related Guides
- ["Arbeitszeitberechnung"](guides/working-time.md#multipleworktimecalendars)

