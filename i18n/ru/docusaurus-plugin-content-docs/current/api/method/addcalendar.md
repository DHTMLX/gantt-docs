---
sidebar_label: addCalendar
title: addCalendar method
description: "вставляет календарь в Gantt chart"
---

# addCalendar

### Description

@short: Вставляет календарь в Gantt chart

@signature: addCalendar: (calendar: CalendarConfig) =\> string

### Parameters

- `calendar` - (required) *CalendarConfig* - объект, содержащий конфигурацию календаря

### Returns
- ` calendarId` - (string) - идентификатор календаря

### Example

~~~jsx
// добавление существующего календаря
var calendarId = gantt.addCalendar(calendar);

// добавление календаря с новой конфигурацией
var calendarId = gantt.addCalendar({
    id:"custom", // необязательно
    worktime: {
        hours: ["8:00-17:00"],
        days: [ 1, 1, 1, 1, 1, 1 ,1]
    }
});

var calendar = gantt.getCalendar(calendarId);
~~~

### Related samples
- [Task level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/06_task_calendars.html)
- [Resource level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/07_resource_calendars.html)
- [Different worktimes for different time periods](https://docs.dhtmlx.com/gantt/samples/09_worktime/12_calendar_ranges.html)

### Details

Объект конфигурации календаря может включать следующие свойства:

- **id?** - (*string | number*) - необязательный идентификатор календаря
- **worktime?** - (*object*) - определяет рабочие дни и часы. Может содержать:
    - **_hours?_** - (*string[] | number[] | boolean*) - необязательно, массив, задающий глобальные рабочие часы, определяющие время начала и окончания задач
    - **_days?_** - (*WorkDaysTuple*) - необязательно, массив из 7 элементов, представляющих дни недели (0 - воскресенье до 6 - суббота), где 1/true означает рабочий день, а 0/false - выходной
    - **_customWeeks?_** - (*object*) - необязательно, объект, задающий различные правила рабочего времени для разных периодов. Состоит из пар ключ:значение, где ключ - название временного интервала, а значение - объект с его атрибутами.
        - **_[timespan: string]_** - (*object*) - временной интервал с настройками рабочего времени. Ключ служит именем интервала.
            - **_from_** - (*Date*) - дата начала интервала
            - **_to_** - (*Date*) - дата окончания интервала
            - **_hours?_** - (*Array&lt;string | number&gt;*) - необязательно, массив интервалов рабочих часов в формате 'от'-'до'. Значение 'false' обозначает выходной, а 'true' (по умолчанию) применяет стандартные часы (["8:00-17:00"])
            - **_days?_** - (*WorkDaysTuple | boolean*) - необязательно, массив из 7 элементов, представляющих дни недели (0 - воскресенье до 6 - суббота), где 1/true - рабочий день, 0/false - выходной.


## Установка пользовательских рабочих часов для конкретного дня

Вместо простого указания номера дня недели можно задать индивидуальные рабочие часы для этого дня.<br>
Например: 

~~~js
var calendar = {
    id:"calendar1", // необязательно
    worktime: {
        hours: ["8:00-17:00"],
        days: [ 0, 1, 1, 1, ["12:00-17:00"], 1, 0]
    }
}
~~~

Здесь ["12:00-17:00"] задаёт рабочие часы с 12:00 до 17:00 для четверга.


## Определение рабочего времени для разных периодов

Можно задать различные правила рабочего времени для разных периодов с помощью свойства **customWeeks**:

~~~js
// добавление календаря с новой конфигурацией
gantt.addCalendar({
    id:"default", // необязательно
    worktime: {
        hours: ["8:00-17:00"],
        days: [ 1, 1, 1, 1, 1, 1 ,1],
        customWeeks: {
            winter: {
                from: new Date(2020, 11, 1),// 1 декабря 2020
                to: new Date(2021, 2, 1),// 1 марта 2021 00:00
                hours: ["9:00-13:00", "14:00-16:00"],
                days: [ 1, 1, 1, 1, 0, 0, 0]
            }
        }
    }
});


~~~

### Related API
- [getCalendar](api/method/getcalendar.md)
- [createCalendar](api/method/createcalendar.md)
- [deleteCalendar](api/method/deletecalendar.md)
- [calendar](api/other/calendar.md)

### Related Guides
- [Расчёт рабочего времени](guides/working-time.md#multipleworktimecalendars)

### Change log
- свойство **customWeeks** было добавлено в версии v7.1;
- добавлено в версии 4.2

