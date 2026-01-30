---
sidebar_label: calculateDuration
title: calculateDuration method
description: "calculates the duration of a task"
---

# calculateDuration

### Description

@short: Calculates the duration of a task

@signature: calculateDuration: (config: object, end_date: Date) =\> number

### Parameters

- `config` - (required) *object | Date* -        either the <a href="#configuration-object-properties">configuration object</a> of a time span or the start date of the task
- `end_date` - (optional) *Date* -  the end date of the task. The parameter is required when the first parameter is specified as start_date.

### Returns
- ` duration` - (number) - the duration of a task in units specified by the [duration_unit](api/config/duration_unit.md) option

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
If the [work_time](api/config/work_time.md) option is enabled, the method calculates the task's duration in working time. 
:::


- The method will use the [global work time calendar](guides/working-time.md#getting-calendars) if no task is specified. 
- Besides, the method can be called directly for a [calendar object](api/other/calendar.md).

## Configuration object properties

The configuration object can contain the following properties:

- **start_date** - (*Date*) the date when a task is scheduled to begin
- **end_date** - (*Date*) the date when a task is scheduled to be completed
* **task** - (*object*)    optional, the object of the task the duration of which should be calculated

### Related API
- [calculateEndDate](api/method/calculateenddate.md)
- [calculateTaskLevel](api/method/calculatetasklevel.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md)

