---
sidebar_label: deleteCalendar
title: deleteCalendar method
description: "удаляет календарь задач по его идентификатору"
---

# deleteCalendar

### Description

@short: Удаляет календарь задач по его идентификатору

@signature: deleteCalendar: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* - идентификатор календаря

### Example

~~~jsx
// добавление календаря
gantt.addCalendar({
    id:"custom",
    worktime: {
        hours: [8, 17],
        days: [ 1, 1, 1, 1, 1, 1 ,1]
    }
});

// удаление календаря
gantt.deleteCalendar("custom");
~~~ 

### Details

добавлен в версии 4.2

### Related API
- [addCalendar](api/method/addcalendar.md)
- [createCalendar](api/method/createcalendar.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md#multipleworktimecalendars)