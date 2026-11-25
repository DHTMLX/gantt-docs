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


- With work time enabled, the method uses the task's calendar if you pass `task`. Otherwise it uses an explicit `calendar` or the [global work time calendar](guides/working-time.md#getting-calendars).
- In JavaScript, use `gantt.calculateDuration({ start_date, end_date, calendar })`. The Gantt method's TypeScript declaration omits `calendar`. Call `calendar.calculateDuration({ start_date, end_date })` on the [calendar object](api/other/calendar.md) in typed code.
- Pass the task or include it as `task` to measure work around its [pauses](guides/resource-leveling.md). Gantt accounts for pauses when the end follows the start and the unit and step match the chart's duration settings. Calling the calendar directly measures the working span without subtracting the pauses.

## Configuration object properties

The configuration object can contain the following properties:

- **start_date** - (*Date*) the date when a task is scheduled to begin
- **end_date** - (*Date*) the date when a task is scheduled to be completed
* **task** - (*object*)    optional, the object of the task the duration of which should be calculated
* **calendar** - (*object*) optional, the work-time calendar to use in the JavaScript object form when no task is given

### Related API
- [calculateEndDate](api/method/calculateenddate.md)
- [calculateTaskLevel](api/method/calculatetasklevel.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md)

