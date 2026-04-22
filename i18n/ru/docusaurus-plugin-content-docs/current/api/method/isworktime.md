---
sidebar_label: isWorkTime
title: isWorkTime method
description: "проверяет, является ли указанная дата рабочей или нет"
---

# isWorkTime

### Description

@short: Проверяет, является ли указанная дата рабочей

@signature: isWorkTime: Calendar['isWorkTime']

### Parameters

- `config` - (required) *object | Date* - либо конфигурационный объект временного диапазона, либо конкретная дата

### Returns
- `isWorkTime` - (boolean) - <i>true</i>, если указанная дата относится к рабочему времени. В противном случае <i>false</i>

### Example

~~~jsx
//проверяет, является ли указанная дата рабочим днем в глобальных настройках
gantt.isWorkTime({ date: new Date(2023,3,5) });
// или
gantt.isWorkTime(new Date(2023,3,5));

//проверяет, является ли указанная дата рабочим днем для конкретной задачи
gantt.isWorkTime({date: new Date(2023,3,5), task: task});
~~~

### Details

:::note
If the [work_time](api/config/work_time.md) option is disabled, the method always returns `true`. 
:::

- The method will use the [global work time calendar](guides/working-time.md#multipleworktimecalendars) if no task is specified. 
- Besides, the method can be called directly from a [calendar object](api/other/calendar.md).


Let's assume that you set the following working time for the chart:

- **Working days**: Monday - Friday
- **Working hours**: 6:00 - 15:00

Then, if you check Monday April,3 2023 as in, you will get: 

~~~js
gantt.isWorkTime({date: new Date(2023,3,3,17,00), unit: "hour"}); 
//->false, потому что 17:00-18:00 не является рабочим временем

gantt.isWorkTime({date: new Date(2023,3,3,17,00), unit:  "day"}); 
//-> true, потому что понедельник является рабочим днем
~~~

## Configuration object properties

The configuration object can contain the following properties:

- **date** - (*Date*) дата для проверки 
* **unit** - (string)    optional, единица времени: "minute", "hour", "day", "week", "month", "year"
- **task** - (*object*)    optional, объект задачи, длительность которой должна быть рассчитана

~~~js
if (gantt.isWorkTime({date: date, task: task})){
    alert("worktime of task" + task.text);
}
~~~

### Related API
- [work_time](api/config/work_time.md)
- [setWorkTime](api/method/setworktime.md)
- [getWorkHours](api/method/getworkhours.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md)