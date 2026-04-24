---
sidebar_label: calendar
title: calendar config
description: "интерфейс для объекта рабочего календаря"
---

# calendar

### Description

@short: Интерфейс рабочего календаря

@signature: calendar: Calendar


### Details

Для подробной информации о рабочих календарях смотрите статью [Расчёт рабочего времени](guides/working-time.md#multipleworktimecalendars).

Объект **calendar** включает следующие методы и свойства:

### Methods

- **setWorkTime (config): boolean** - устанавливает рабочее время для диаграммы Ганта
    - **_config_** - (*object*) - объект конфигурации времени: [configuration object](api/method/setworktime.md#configuration-object-properties) временного диапазона:
        - **_day?_** - (*string | number*) - необязательный, номер дня недели [0 (воскресенье) - 6 (суббота)]. Примечание: можно установить только 1 день за раз
        - **_date?_** - (*Date*) - необязательная, конкретная дата, которая будет установлена как рабочий день или выходной
        - **_hours?_** - (*string[] | number[] | boolean*) - необязательный, массив рабочих часов в виде пар 'from'-'to'. Значение 'false' устанавливает выходной день, 'true' (значение по умолчанию) применяет часы по умолчанию (["8:00-17:00"])
        - **_customWeeks?_** - (*object*) - необязательный, объект с различными правилами рабочего времени для разных периодов времени. Объект может содержать набор пар key:value, где ключ — имя временного диапазона, а значение — объект со списком атрибутов.
            - **_[timespan: string]_** - (*object*) - временной диапазон с настройками рабочего времени. Имя этого объекта используется как имя временного диапазона
                - **_from_** - (*Date*) - дата, когда запланировано начало временного диапазона
                - **_to_** - (*Date*) - дата, когда запланировано завершение временного диапазона
                - **_hours?_** - (*string[] | number[]*) - необязательный, массив рабочих часов в виде пар 'from'-'to'. Значение 'false' устанавливает выходной день, 'true' (значение по умолчанию) применяет часы по умолчанию (["8:00-17:00"])
                - **_days?_** - (*WorkDaysTuple | boolean*) - необязательный, массив из 7 дней недели (от 0 — воскресенье, до 6 — суббота), где 1/true обозначает рабочий день, а 0/false — нерабочий день.

  
~~~js
calendar.setWorkTime({ hours:["9:00-18:00"] });
calendar.setWorkTime({ hours:["9:00-18:00"] });
calendar.setWorkTime({ day: 5, hours: ["9:00-18:00"] });
calendar.setWorkTime({ day: 5, hours: false });
calendar.setWorkTime({ date: new Date(2025, 5, 6), hours: ["9:00-18:00"] });
calendar.setWorkTime({ date: new Date(2025, 5, 6), hours: false });
calendar.setWorkTime({ hours: false });
calendar.setWorkTime({
  customWeeks: {
    winter: {
      from: new Date(2025, 11, 1),
      to: new Date(2026, 2, 1),
      hours: ["8:00-13:00", "14:00-16:00"],
      days: [1, 1, 1, 1, 1, 0, 0]
    },
    summer: {
      from: new Date(2026, 5, 1),
      to: new Date(2026, 7, 1),
      hours: ["10:00-13:00", "14:00-16:00"],
      days: [1, 1, 0, 1, 1, 0, 0]
    }
  }
});
calendar.setWorkTime({
  customWeeks: {
    winter: {
      from: new Date(2025, 11, 1),
      to: new Date(2026, 2, 1),
      hours: ["8:00-13:00", "14:00-16:00"],
      days: [1, ["8:00-13:00"], 1, 1, ["14:00-16:00"], 0, 0]
    },
    summer: {
      from: new Date(2026, 5, 1),
      to: new Date(2026, 7, 1),
      hours: ["10:00-13:00", "14:00-16:00"],
      days: false
    }
  }
});
~~~

- **unsetWorkTime (config): void** - сбрасывает рабочее время в диаграмме Ганта
    - **_config_** - (*object*) - объект конфигурации времени: [configuration object](api/method/unsetworktime.md#configuration-object-properties) временного диапазона:
        - **_day?_** - (*string | number*) - необязательный, номер дня недели [0 (воскресенье) - 6 (суббота)]. Примечание: можно установить только 1 день за раз
        - **_date?_** - (*Date*) - необязательная, конкретная дата, которая будет установлена как рабочий день или выходной
        - **_hours?_** - (*string[] | number[] | boolean*) - необязательный, массив рабочих часов в виде пар 'from'-'to'. Значение 'false' снимает рабочие часы, 'true' (значение по умолчанию) применяет часы по умолчанию (["8:00-17:00"])


~~~js
calendar.unsetWorkTime({ hours: ["9:00-18:00"] });
calendar.unsetWorkTime({ day: "5", hours: ["9:00-18:00"] });
calendar.unsetWorkTime({ day: 5, hours: false });
calendar.unsetWorkTime({ date: new Date(2025, 5, 6), hours: true });
~~~

- **isWorkTime (config, time_unit): boolean** - проверяет, является ли указанная дата рабочим временем
    - **_config_** - (*Date | object*) - либо дата для проверки, либо [configuration object](api/method/isworktime.md#configuration-object-properties) временного диапазона:
        - **_date_** - (*Date*) - дата для проверки
        - **_unit?_** - (*string*) - необязательная единица времени: "minute", "hour", "day", "week", "month", "year"
    - **_time_unit?_** - (*string*) - необязательная единица времени: "minute", "hour", "day", "week", "month", "year". Не требуется вовсе, когда первый параметр задан как объект

~~~js
const calendar = gantt.getTaskCalendar(task);
if (calendar.isWorkTime({date: date})){
    alert("worktime of task" + task.text);
}

calendar.isWorkTime(new Date(2025, 5, 6));
calendar.isWorkTime(new Date(2025, 5, 6), "hour");
calendar.isWorkTime({ date: new Date(2025, 5, 6), unit: "hour" });
~~~

- **getClosestWorkTime (config): Date** - возвращает ближайшее рабочее время
    - **_config_** - (*Date | object*) - [configuration object](api/method/getclosestworktime.md#configuration-object-properties) временного диапазона:
        - **_date_** - (*Date*) - дата, для которой нужно найти ближайшее рабочее время
        - **_dir?_** - (*string*) - необязательное, направление ближайшего времени: "future" или "past"
        - **_unit?_** - (*string*) - необязательная единица времени для поиска ближайшего рабочего времени

~~~js
calendar.getClosestWorkTime(new Date(2025, 5, 6));
calendar.getClosestWorkTime({ 
    date: new Date(2025, 5, 6), 
    unit: "hour",
    dir: "past" 
});
~~~


- **calculateEndDate (config, duration, unit): Date** - вычисляет конечную дату задачи
    - **_config_** - (*Date | object*) - либо дата начала задачи, либо [configuration object](api/method/calculateenddate.md#configuration-object-properties) временного диапазона:
        - **_start_date_** - (*Date*) - дата, когда задача запланирована к началу
        - **_duration_** - (*number*) - продолжительность задачи
        - **_unit?_** - (*string*) - необязательная единица времени продолжительности: "minute", "hour", "day", "week", "month", "year"
    - **_duration?_** - (*number*) - необязательная продолжительность задачи. Не нужна, если первый параметр задан как объект
    - **_unit?_** - (*string*) - необязательная единица времени продолжительности. Не нужна, если первый параметр задан как объект

~~~js
calendar.calculateEndDate(new Date(2025, 5, 6), 2, "hour");
calendar.calculateEndDate({ 
    start_date: new Date(2025, 5, 6), 
    duration: 2, 
    unit: "hour" 
});
~~~

- **calculateDuration (config, end): number** - вычисляет продолжительность задачи 
    - **_config_** - (*Date | object*) - либо дата начала задачи, либо [configuration object](api/method/calculateduration.md#configuration-object-properties) временного диапазона:
        - **_start_date_** - (*Date*) - дата начала задачи
        - **_end_date_** - (*Date*) - дата завершения задачи
    - **_end?_**    - (*Date*) - дата завершения задачи. Не нужна, если первый параметр задан как объект

~~~js
calendar.calculateDuration(new Date(2025, 5, 6), new Date(2025, 5, 17));
calendar.calculateDuration({ 
    start_date: new Date(2025, 5, 6), 
    end_date: new Date(2025, 5, 17) 
});
~~~


### Properties

- **id** - (*string | number*) - идентификатор календаря задачи

### Related API
- [addCalendar](api/method/addcalendar.md)
- [getCalendar](api/method/getcalendar.md)
- [createCalendar](api/method/createcalendar.md)

### Related Guides
- [Расчет рабочего времени](guides/working-time.md#assigningcalendartotask)