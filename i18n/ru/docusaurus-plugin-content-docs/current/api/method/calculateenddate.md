---
sidebar_label: calculateEndDate
title: calculateEndDate method
description: "вычисляет дату окончания задачи"
---

# calculateEndDate

### Description

@short: Определяет дату завершения задачи

@signature: calculateEndDate: (config: object, duration: number) =\> Date

### Parameters

- `config` - (required) *object | Date* - либо <a href="#configuration-object-properties">объект конфигурации временного диапазона</a> или начальная дата задачи
- `duration` - (optional) *number* - продолжительность задачи. Параметр обязателен, когда первый параметр указан как start_date

### Returns
- ` end_date` - (Date) - дата, на которую запланировано завершение задачи

### Example

~~~jsx
gantt.config.work_time = true;
gantt.init("gantt_here");
 
// calculate the end date using global worktime settings
gantt.calculateEndDate({start_date: new Date(2013,02,15), duration: 48});
// or
gantt.calculateEndDate(new Date(2013,02,15), 48);

// calculate end date for a specific task calendar
gantt.calculateEndDate({start_date: new Date(2013,02,15), duration: 48, task:task});
// or, a short form:
// will use calendar currently assigned to a task, task.start_date and task.duration
gantt.calculateEndDate(task);
~~~

### Details

:::note
Если включена опция [work_time](api/config/work_time.md), метод учитывает duration как рабочее время.
:::

- Метод будет использовать глобальный календарь рабочего времени [global work time calendar](guides/working-time.md#multipleworktimecalendars) если задача не указана.
- Кроме того, метод можно вызывать напрямую для [calendar object](api/other/calendar.md).

Вы также можете вычислить начальную дату, используя метод **calculateEndDate**:

~~~js
//calculate the start date:
task.start_date = gantt.calculateEndDate({
    start_date: task.end_date,
    duration: -task.duration
});
~~~

## Свойства объекта конфигурации

Объект конфигурации может содержать следующие свойства:

- **start_date** - (*Date*) дата начала выполнения задачи
- **duration** - (*number*) продолжительность задачи
- * **unit** - (*string*) optional, единица времени продолжительности: "minute", "hour", "day", "week", "month", "year"
- * **task** - (*object*) optional, объект задачи, для которого должна быть рассчитана продолжительность

### Related API
- [calculateDuration](api/method/calculateduration.md)
- [calculateTaskLevel](api/method/calculatetasklevel.md)