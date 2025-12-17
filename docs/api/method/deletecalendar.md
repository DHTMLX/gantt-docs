---
sidebar_label: deleteCalendar
title: deleteCalendar method
description: "deletes a task calendar by its id"
---

# deleteCalendar

### Description

@short: Deletes a task calendar by its id

@signature: deleteCalendar: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -        the id of the calendar

### Example

~~~jsx
// adding a calendar
gantt.addCalendar({
    id:"custom",
    worktime: {
        hours: [8, 17],
        days: [ 1, 1, 1, 1, 1, 1 ,1]
    }
});

// deleting a calendar
gantt.deleteCalendar("custom");
~~~

### Details

added in version 4.2

### Related API
- [addCalendar](api/method/addcalendar.md)
- [createCalendar](api/method/createcalendar.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md#multipleworktimecalendars)

