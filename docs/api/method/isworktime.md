---
sidebar_label: isWorkTime
title: isWorkTime method
description: "checks whether the specified date is working or not"
---

# isWorkTime

### Description

@short: Checks whether the specified date is working or not

@signature: isWorkTime: Calendar['isWorkTime']

### Parameters

- `config` - (required) *object | Date* -        either the configuration object of a time span or a specific date

### Returns
- ` isWorkTime` - (boolean) - <i>true</i>, if the specified date is working time. Otherwise, <i>false</i>

### Example

~~~jsx
//checks whether the specified date is a working day in global settings
gantt.isWorkTime({ date: new Date(2023,3,5) });
// or
gantt.isWorkTime(new Date(2023,3,5));

//checks whether the specified date is working day for a specific task
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
//->false, cause 17:00-18:00 is not working time

gantt.isWorkTime({date: new Date(2023,3,3,17,00), unit:  "day"}); 
//-> true, cause Monday is a working day
~~~

## Configuration object properties

The configuration object can contain the following properties:

- **date** - (*Date*) a date to check 
* **unit** - (string)    optional, a time unit: "minute", "hour", "day", "week", "month", "year"
* **task** - (*object*)    optional, the object of the task the duration of which should be calculated

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

