---
sidebar_label: unsetWorkTime
title: unsetWorkTime method
description: "unsets a working time in the Gantt Chart"
---

# unsetWorkTime

### Description

@short: Unsets a working time in the Gantt Chart

@signature: unsetWorkTime: (config: object) =\> void

### Parameters

- `config` - (required) *object* - the configuration object of a time span

### Example

~~~jsx
gantt.config.work_time = true;
 
// changes the working time of working days from ["8:00-17:00"] to ["9:00-18:00"]
gantt.setWorkTime({ hours: ["9:00-18:00"] });
// unsets the working time
gantt.unsetWorkTime({ hours: ["9:00-18:00"] });
~~~

### Related samples
- [Calculate working hours](https://docs.dhtmlx.com/gantt/samples/09_worktime/01_working_hours_per_day.html)

### Details

added in version 4.1

- The method will use the [global work time calendar](guides/working-time.md#multipleworktimecalendars) if no task is specified. 
- Besides, the method can be called directly from a [calendar object](api/other/calendar.md).


## Configuration object properties


The configuration object can contain the following properties:


<table class="list" cellspacing="0" cellpadding="5" border="0">
    <thead>
    <tr>
        <th>
            Property 
        </th>
        <th>
            Description
        </th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td rowspan="2"><b id="day">day</b></td>
  <td> a number of a week day [0 (<i>Sunday</i>) - 6 (<i>Saturday</i>)]. Note, you can set only 1 day at once</td>
  </tr>
  <tr>
        <td colspan="2" style="text-align:left !important; ">
~~~js
// unsets working hours for Mondays 
gantt.unsetWorkTime({ day: 1, hours: false }); 
~~~
        </td>
    </tr>
    <tr>
        <td rowspan="2"><b id="date">date</b></td>
  <td> a specific date to set/unset working hours for</td>
  </tr>
  <tr>
        <td colspan="2" style="text-align:left !important; ">
~~~js
// unsets working hours for a specific date 
gantt.unsetWorkTime({ 
    date: new Date(2025, 11, 1), 
    hours: false 
});
~~~
        </td>
    </tr>
  <tr>
        <td rowspan="2"><b id="hours">hours</b></td>
  <td> an array of working hours as 'from'-'to' pairs. <br/><i>'false'</i> value unsets working hours, <i>'true' (default value)</i> applies the default hours (["8:00-17:00"])</td>
  </tr>
  <tr>
        <td colspan="2" style="text-align:left !important; ">
~~~js
// unsets the working time for Fridays from 8:00 till 12:00
gantt.unsetWorkTime({ day : 5, hours : ["8:00-12:00"] });
~~~
        </td>
    </tr>
    </tbody>
</table>

### Related API
- [work_time](api/config/work_time.md)
- [setWorkTime](api/method/setworktime.md)
- [isWorkTime](api/method/isworktime.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md#unsetting-the-working-time)

