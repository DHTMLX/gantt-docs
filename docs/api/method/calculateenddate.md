---
sidebar_label: calculateEndDate
title: calculateEndDate method
description: "calculates the end date of a task"
---

# calculateEndDate

### Description

@short: Calculates the end date of a task

@signature: calculateEndDate: (config: object, duration: number) =\> Date

### Parameters

- `config` - (required) *object | Date* - either the <a href="#configuration-object-properties">configuration object</a> of a time span or the start date of the task
- `duration` - (optional) *number* - the duration of the task. The parameter is required when the first parameter is specified as start_date

### Returns
- ` end_date` - (Date) - the date when a task is scheduled to be completed

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
If the [work_time](api/config/work_time.md) option is enabled, the method considers duration as working time. 
:::

- The method will use the [global work time calendar](guides/working-time.md#multipleworktimecalendars) if no task is specified. 
- Besides, the method can be called directly for a [calendar object](api/other/calendar.md).


You can also calculate the start date by using the **calculateEndDate** method:

~~~js
//calculate the start date:
task.start_date = gantt.calculateEndDate({
    start_date: task.end_date,
    duration: -task.duration
});
~~~

## Configuration object properties

The configuration object can contain the following properties:

- **start_date** - (*Date*) the date when a task is scheduled to begin
- **duration** - (*number*)    the duration of a task
* **unit** - (*string*)    optional, the time unit of the duration: "minute", "hour", "day", "week", "month", "year"
* **task** - (*object*)    optional, the object of the task the duration of which should be calculated

### Related API
- [calculateDuration](api/method/calculateduration.md)
- [calculateTaskLevel](api/method/calculatetasklevel.md)

