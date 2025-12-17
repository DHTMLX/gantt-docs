---
sidebar_label: mergeCalendars
title: mergeCalendars method
description: "объединяет несколько рабочих календарей в один"
---

# mergeCalendars

### Description

@short: Объединяет несколько рабочих календарей в один

@signature: mergeCalendars: (calendars: Calendar[] | Calendar, calendar2?: Calendar) =\> void

### Parameters

- `calendars` - (required) *Calendar[] | Calendar* -       либо массив объектов календарей, либо один объект календаря
- `calendar2` - (optional) *Calendar* - необязательный параметр, второй объект календаря

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

// передаем массив календарей для объединения
const joinedCalendar = gantt.mergeCalendars([
    gantt.getCalendar(mikeCalendarId),
    gantt.getCalendar(johnCalendarId)
]);
~~~

### Details

Вы также можете передать несколько объектов календарей как отдельные параметры в метод **mergeCalendars**:

~~~js
// передаем календари как отдельные аргументы
const joinedCalendar = gantt.mergeCalendars(
    gantt.getCalendar(mikeCalendarId),
    gantt.getCalendar(johnCalendarId)
);
~~~

## Как работает объединение календарей

При объединении календарей рабочие дни итогового календаря определяются на основе проверки, является ли каждый день рабочим во всех объединяемых календарях (используется логическая операция AND (&&)):

~~~html
// календарь 1 + календарь 2 = объединенный календарь;

// Случай 1: 
// рабочий день (1/true) + рабочий день (1/true) = рабочий день (1/true);

// Случай 2: 
// рабочий день (1/true) + нерабочий день (0/false) = нерабочий день (0/false);

// Случай 3: 
// нерабочий день (0/false) + нерабочий день (0/false) = нерабочий день (0/false);
~~~

Например, даны два календаря:

- первый календарь имеет рабочие дни в понедельник и среду:

~~~js
const calendar1Id = gantt.addCalendar({
    id: "calendar1",
    worktime: {
        days: [ 0, 1, 0, 1, 0, 0, 0 ]
    }
});
~~~

- второй календарь имеет рабочие дни в понедельник, вторник и четверг:

~~~js
const calendar2Id = gantt.addCalendar({
    id: "calendar2",
    worktime: {
        days: [ 0, 1, 1, 0, 1, 0, 0 ]
    }
});
~~~

Объединение этих календарей:

~~~js
const joinedCalendar = gantt.mergeCalendars([
    gantt.getCalendar(calendar1Id),
    gantt.getCalendar(calendar2Id)
]);
~~~

даст календарь, в котором рабочим днем будет только понедельник:

~~~html
// дни: [ 0, 1, 0, 1, 0, 0, 0 ]

// +

// дни: [ 0, 1, 1, 0, 1, 0, 0 ]

// =

// дни: [ 0, 1, 0, 0, 0, 0, 0 ]
~~~

**Связанный пример:** [Gantt. Merge work calendars (via mergeCalendars() method)](https://snippet.dhtmlx.com/56vubu7a)

:::note
 Логика объединения не учитывает [customWeeks](api/method/addcalendar.md). 
:::

### Related API
- [calendar](api/other/calendar.md)
- [getCalendar](api/method/getcalendar.md)
- [getResourceCalendar](api/method/getresourcecalendar.md)

### Related Guides
- [Расчёт рабочего времени](guides/working-time.md#assigningcalendartoresource)

### Change log
- добавлено в v7.0

