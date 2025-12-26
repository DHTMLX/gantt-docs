---
sidebar_label: calendar
title: calendar config
description: "интерфейс для объекта рабочего календаря"
---

# calendar

### Description

@short: Интерфейс для объекта рабочего календаря

@signature: calendar: Calendar


### Details

Для подробной информации о рабочих календарях смотрите статью [Расчёт рабочего времени](guides/working-time.md#multipleworktimecalendars).

Объект **calendar** включает следующие методы и свойства:

## Методы

- **setWorkTime (config): boolean** - задаёт рабочие часы для диаграммы Ганта
    - **_config_** - (*object*) - [объект конфигурации](api/method/setworktime.md#configurationobjectproperties), описывающий временной интервал:
        - **_day?_** - (*string | number*) - необязательно, номер дня недели [0 (воскресенье) - 6 (суббота)]. Обратите внимание, что можно задать только один день за раз
        - **_date?_** - (*Date*) - необязательно, конкретная дата, которую нужно отметить как рабочую или нерабочую
        - **_hours?_** - (*string[] | number[] | boolean*) - необязательно, массив рабочих часов в виде пар 'от'-'до'. Значение 'false' отмечает день как выходной, 'true' (по умолчанию) применяет часы по умолчанию (["8:00-17:00"])
        - **_customWeeks?_** - (*object*) - необязательно, объект, определяющий разные правила рабочего времени для различных периодов. Содержит пары ключ:значение, где ключ - имя временного интервала, а значение - объект с атрибутами:
            - **_[timespan: string]_** - (*object*) - временной интервал с настройками рабочего времени. Имя ключа используется как имя временного интервала
                - **_from_** - (*Date*) - дата начала интервала
                - **_to_** - (*Date*) - дата окончания интервала
                - **_hours?_** - (*string[] | number[]*) - необязательно, массив рабочих часов в виде пар 'от'-'до'. 'false' отмечает день как выходной, 'true' (по умолчанию) применяет часы по умолчанию (["8:00-17:00"])
                - **_days?_** - (*WorkDaysTuple | boolean*) - необязательно, массив из 7 элементов, представляющих дни недели (0 - воскресенье, 6 - суббота), где 1/true означает рабочий день, а 0/false - выходной.

  
~~~js
calendar.setWorkTime({ hours:["9:00-18:00"] });
~~~

- **unsetWorkTime (config): void** - удаляет настройку рабочего времени из диаграммы Ганта
    - **_config_** - (*object*) - [объект конфигурации](api/method/unsetworktime.md#configurationobjectproperties), описывающий временной интервал:
        - **_day?_** - (*string | number*) - необязательно, номер дня недели [0 (воскресенье) - 6 (суббота)]. Можно задать только один день за раз
        - **_date?_** - (*Date*) - необязательно, конкретная дата, которую нужно отметить как рабочую или нерабочую
        - **_hours?_** - (*string[] | number[] | boolean*) - необязательно, массив рабочих часов в виде пар 'от'-'до'. 'false' отмечает день как выходной, 'true' (по умолчанию) применяет часы по умолчанию (["8:00-17:00"])


~~~js
calendar.unsetWorkTime({ hours:["9:00-18:00"] });
~~~

- **isWorkTime (config, time_unit): boolean** - определяет, является ли указанная дата рабочим временем
    - **_config_** - (*Date | object*) - либо объект Date для проверки, либо [объект конфигурации](api/method/isworktime.md#configurationobjectproperties), описывающий временной интервал:
        - **_date_** - (*Date*) - дата для проверки
        - **_unit?_** - (*string*) - необязательно, единица времени: "minute", "hour", "day", "week", "month", "year"
        - **_task?_** - (*Task*) - необязательно, объект задачи, длительность которой следует учитывать
    - **_time_unit?_** - (*string*) - необязательно, единица времени: "minute", "hour", "day", "week", "month", "year". Не требуется, если первый параметр - объект<br><br>

~~~js
var calendar = gantt.getTaskCalendar(task);
if (calendar.isWorkTime({date: date})){
    alert("worktime of task" + task.text);
}
~~~

- **getClosestWorkTime (config): Date** - находит ближайшее рабочее время
    - **_config_** - (*Date | object*) - [объект конфигурации](api/method/getclosestworktime.md#configurationobjectproperties):
        - **_date_** - (*Date*) - дата, для которой нужно найти ближайшее рабочее время
        - **_dir?_** - (*string*) - необязательно, направление поиска: "future" или "past"
        - **_unit?_** - (*string*) - необязательно, единица времени для поиска
        - **_task?_** - (*Task*) - необязательно, объект задачи, для которой используется календарь

~~~js
calendar.getClosestWorkTime({
    date:new Date(2013,0,1), 
    dir:"future", 
    unit:"hour"
});
~~~


- **calculateEndDate (config, duration, unit): Date** - вычисляет дату окончания задачи
    - **_config_** - (*Date | object*) - либо дата начала задачи, либо [объект конфигурации](api/method/calculateenddate.md#configurationobjectproperties), описывающий временной интервал:
        - **_start_date_** - (*Date*) - дата начала задачи
        - **_duration_** - (*number*) - длительность задачи
        - **_unit?_** - (*string*) - необязательно, единица времени длительности: "minute", "hour", "day", "week", "month", "year"
        - **_task?_** - (*Task*) - необязательно, объект задачи, длительность которой нужно вычислить
    - **_duration?_** - (*number*) - необязательно, длительность задачи. Не нужна, если первый параметр - объект
    - **_unit?_** - (*string*) - необязательно, единица времени длительности. Не нужна, если первый параметр - объект<br>

~~~js
var end_date = calendar.calculateEndDate({start_date:date, duration:duration});
~~~

- **calculateDuration (config, end): number** - вычисляет длительность задачи
    - **_config_** - (*Date | object*) - либо дата начала задачи, либо [объект конфигурации](api/method/calculateduration.md#configurationobjectproperties), описывающий временной интервал:
        - **_start_date_** - (*Date*) - дата начала задачи
        - **_end_date_** - (*Date*) - дата окончания задачи
        - **_task?_** - (*Task*) - необязательно, объект задачи, длительность которой нужно вычислить
    - **_end?_**    - (*Date*) - дата окончания задачи. Не нужна, если первый параметр - объект<br>

~~~js
calendar.calculateDuration(new Date(2013,02,15), new Date(2013,02,25));
~~~


## Свойства

- **id** - (*string | number*) - идентификатор календаря задачи

### Related API
- [addCalendar](api/method/addcalendar.md)
- [getCalendar](api/method/getcalendar.md)
- [createCalendar](api/method/createcalendar.md)

### Related Guides
- [Расчёт рабочего времени](guides/working-time.md#assigningcalendartotask)

