---
sidebar_label: calculateEndDate
title: calculateEndDate method
description: "вычисляет дату окончания задачи"
---

# calculateEndDate

### Description

@short: Вычисляет дату окончания задачи

@signature: calculateEndDate: (config: object | number, duration: number) =\> Date

### Parameters

- `config` - (required) *object | Date* -        может быть либо [объектом конфигурации](#configurationobjectproperties), описывающим временной интервал, либо просто датой начала задачи
- `duration` - (required) *number* - необязательный параметр, длительность задачи. Необходим, если первый параметр - это просто <i>start_date</i>

### Returns
- ` end_date` - (Date) - дата, когда ожидается завершение задачи

### Example

~~~jsx
gantt.config.work_time = true;
gantt.init("gantt_here");
 
// вычислить дату окончания на основе глобальных настроек рабочего времени
gantt.calculateEndDate({start_date: new Date(2013,02,15), duration: 48});
// или
gantt.calculateEndDate(new Date(2013,02,15), 48);

// получить дату окончания для конкретного календаря задачи
gantt.calculateEndDate({start_date: new Date(2013,02,15), duration: 48, task:task});
// или, сокращённо:
// используется календарь, назначенный задаче, а также собственные start_date и duration задачи
gantt.calculateEndDate(task);
~~~

### Details

:::note

Если опция [work_time](api/config/work_time.md) включена, метод рассматривает duration как рабочее время. 
 
:::

- Если задача не указана, метод по умолчанию использует [глобальный календарь рабочего времени](guides/working-time.md#multipleworktimecalendars). <br>
- Метод также можно применять напрямую к [объекту календаря](api/other/calendar.md).


Также можно вычислить дату начала, используя **calculateEndDate** следующим образом:

~~~js
// вычислить дату начала:
task.start_date = gantt.calculateEndDate({
    start_date: task.end_date,
    duration: -task.duration
});
~~~

## Свойства объекта конфигурации {#configurationobjectproperties}

Объект конфигурации может содержать следующие свойства:

- **start_date** - (*Date*) дата планируемого начала задачи
- **duration** - (*number*) длительность задачи
* **unit** - (*string*) необязательный параметр, единица измерения длительности: "minute", "hour", "day", "week", "month", "year"
* **task** - (*object*) необязательный параметр, объект задачи, длительность которой нужно вычислить

### Related API
- [calculateDuration](api/method/calculateduration.md)
- [calculateTaskLevel](api/method/calculatetasklevel.md)

