---
sidebar_label: deleteCalendar
title: deleteCalendar method
description: "удаляет календарь задач по его id"
---

# deleteCalendar

### Description

@short: Удаляет календарь задач по его id

@signature: deleteCalendar: (id: string | number) =\> void

### Parameters

- `id` - (required) *string | number* -        id календаря

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

введено в версии 4.2

### Related API
- [addCalendar](api/method/addcalendar.md)
- [createCalendar](api/method/createcalendar.md)

### Related Guides
- [Расчёт рабочего времени](guides/working-time.md#multipleworktimecalendars)

