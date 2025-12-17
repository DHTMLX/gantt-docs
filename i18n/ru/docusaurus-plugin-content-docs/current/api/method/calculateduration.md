---
sidebar_label: calculateDuration
title: calculateDuration method
description: "вычисляет продолжительность задачи"
---

# calculateDuration

### Description

@short: Вычисляет продолжительность задачи

@signature: calculateDuration: (config: object | Date, end_date: Date) =\> number

### Parameters

- `config` - (required) *object | Date* -        может быть либо [объектом конфигурации](#configurationobjectproperties), описывающим временной интервал, либо просто датой начала задачи
- `end_date` - (required) *Date* - необязательный параметр, дата окончания задачи. Необходим, если первый параметр - это только <i>start_date</i>.

### Returns
- ` duration` - (number) - продолжительность задачи в единицах, заданных опцией [duration_unit](api/config/duration_unit.md)

### Example

~~~jsx
gantt.config.work_time = true;
gantt.init("gantt_here");

// получить продолжительность рабочего времени между двумя датами 
// (полезно для задач с несколькими рабочими календарями)
gantt.calculateDuration({
    start_date: new Date(2013,02,15), 
    end_date: new Date(2013,02,25)
    /*,task: task*/
});

// или 
gantt.calculateDuration(task);

// или 
gantt.calculateDuration(new Date(2013,02,15), new Date(2013,02,25)); //->6
~~~

### Details

:::note

Когда активирована опция [work_time](api/config/work_time.md), этот метод вычисляет продолжительность задачи на основе рабочего времени. 
 
:::

- Если задача не передана, по умолчанию используется [глобальный календарь рабочего времени](guides/working-time.md#multipleworktimecalendars). <br>
- Этот метод также можно использовать напрямую с [объектом календаря](api/other/calendar.md).

## Свойства объекта конфигурации {#configurationobjectproperties}

Объект конфигурации может включать следующие свойства:

- **start_date** - (*Date*) дата начала планируемой задачи
- **end_date** - (*Date*) дата окончания планируемой задачи
* **task** - (*object*)    необязательный, объект задачи, для которой нужно вычислить продолжительность

### Related API
- [calculateEndDate](api/method/calculateenddate.md)
- [calculateTaskLevel](api/method/calculatetasklevel.md)

### Related Guides
- - [Расчёт рабочего времени](guides/working-time.md)

