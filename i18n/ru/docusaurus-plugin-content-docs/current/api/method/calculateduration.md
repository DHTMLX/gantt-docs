---
sidebar_label: calculateDuration
title: calculateDuration метод
description: "вычисляет продолжительность задачи"
---

# calculateDuration

### Description

@short: Вычисляет продолжительность задачи

@signature: calculateDuration: (config: object, end_date: Date) => number

### Parameters

- `config` - (required) *object | Date* - либо <a href="#configuration-object-properties">объект конфигурации временного диапазона</a> или начальная дата задачи
- `end_date` - (optional) *Date* -  конечная дата задачи. Параметр обязателен, если первый параметр указан как start_date.

### Returns
- ` duration` - (number) - продолжительность задачи в единицах, указанных опцией [duration_unit](api/config/duration_unit.md)

### Example

~~~jsx
gantt.config.work_time = true;
gantt.init("gantt_here");

// calculate worktime duration between specified dates 
// (for specific task, if multiple working calendars used)
gantt.calculateDuration({
    start_date: new Date(2013,02,15), 
    end_date: new Date(2013,02,25)
    /*,task: task*/
});

// or 
gantt.calculateDuration(task);

// or 
gantt.calculateDuration(new Date(2013,02,15), new Date(2013,02,25)); //->6
~~~

### Details

:::note
Если опция [work_time](api/config/work_time.md) включена, метод рассчитывает продолжительность задачи в рабочем времени. 
:::

- Метод будет использовать глобальный календарь рабочего времени ([глобальный календарь рабочего времени](guides/working-time.md#getting-calendars)) если задача не указана. 
- Кроме того, метод можно вызвать напрямую для объекта [calendar](api/other/calendar.md).

## Свойства конфигурационного объекта

Конфигурационный объект может содержать следующие свойства:

- **start_date** - (*Date*) дата начала задачи
- **end_date** - (*Date*) дата завершения задачи
* **task** - (*object*)    необязательный, объект задачи, продолжительность которой должна быть рассчитана

### Связанные API
- [calculateEndDate](api/method/calculateenddate.md)
- [calculateTaskLevel](api/method/calculatetasklevel.md)

### Связанные руководства
- [Расчет рабочего времени](guides/working-time.md)