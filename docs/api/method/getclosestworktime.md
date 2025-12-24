---
sidebar_label: getClosestWorkTime
title: getClosestWorkTime method
description: "returns the closest working time"
---

# getClosestWorkTime

### Description

@short: Returns the closest working time

@signature: getClosestWorkTime: (config: object) =\> Date

### Parameters

- `config` - (required) *object* - the configuration object or the date

### Returns
- ` date` - (Date) - a Date object of the closest working time

### Example

~~~jsx
// checks whether the specified date is a working day in global settings
gantt.getClosestWorkTime({date:new Date(2019,04,26)});
// or
gantt.getClosestWorkTime(new Date(2019,04,26));

// checks whether the specified date is a working day for a specific task
gantt.getClosestWorkTime({ date: new Date(2019,04,26), task:task });
~~~

### Details

:::note
If the [work_time](api/config/work_time.md) option is disabled, the method returns the date unchanged. 
:::

- The method will use the [global work time calendar](guides/working-time.md#getting-calendars) if no task is specified. 
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
		<td rowspan="2" style="text-align:center"><b id="date">date</b></td>
  <td>a date to get the closest working time for</td>
  </tr>
  <tr>
		<td colspan="2">
~~~js
gantt.getClosestWorkTime({
	date:new Date(2019,04,26),
    dir:"future"
});
// -> Mon May 27 2019 00:00:00 if duration_unit="day"
// -> Mon May 27 2019 08:00:00 if duration_unit="hour"
~~~
		</td>
	</tr>
  <tr>
		<td rowspan="2" style="text-align:center"><b id="dir">dir</b></td>
  <td> (<i>'future'</i> or <i>'past'</i>) specifies the direction of the closest time</td>
  </tr>
  <tr>
		<td colspan="2" style="text-align:left !important; ">
~~~js
gantt.getClosestWorkTime({
	date:new Date(2019,04,18),
    dir:"past"
});
// -> Sat May 18 2019 00:00:00
~~~
		</td>
	</tr>
	<tr>
		<td rowspan="2" style="text-align:center"><b id="unit">unit</b></td>
  <td> a time unit to search for the closest working time</td>
  </tr>
  <tr>
		<td colspan="2" style="text-align:left !important; ">
~~~js
//searches for the closest working hour
gantt.getClosestWorkTime({
    date:new Date(2019,04,18), 
    dir:"future", 
    unit:"hour"
});
// -> Mon May 20 2019 08:00:00
~~~
		</td>
	</tr>
  <tr>
		<td rowspan="2" style="text-align:center"><b id="unit">task</b></td>
  <td> optional, the object of the task the duration of which should be calculated</td>
  </tr>
  <tr>
		<td colspan="2" style="text-align:left !important; ">
~~~js
var closestTime = gantt.getClosestWorkTime({
	date:date, 
    task:task
});
~~~
		</td>
	</tr>
	</tbody>
</table>

~~~js
gantt.getClosestWorkTime({
    date:new Date(2019,04,26),
    dir:"future"
});
// -> Mon May 27 2019 00:00:00 if duration_unit="day"
// -> Mon May 27 2019 08:00:00 if duration_unit="hour"
~~~
  
  
  
  dir
  ('future' or 'past') specifies the direction of the closest time
  
  
  
~~~js
gantt.getClosestWorkTime({
    date:new Date(2019,04,18),
    dir:"past"
});
// -> Sat May 18 2019 00:00:00
~~~
  
  
  
  unit
  a time unit to search for the closest working time
  
  
  
~~~js
//searches for the closest working hour
gantt.getClosestWorkTime({
    date:new Date(2019,04,18), 
    dir:"future", 
    unit:"hour"
});
// -> Mon May 20 2019 08:00:00
~~~
  
  
  
  task
  optional, the object of the task the duration of which should be calculated
  
  
  
~~~js
var closestTime = gantt.getClosestWorkTime({
    date:date, 
    task:task
});
~~~

### Related API
- [work_time](api/config/work_time.md)
- [setWorkTime](api/method/setworktime.md)
- [getWorkHours](api/method/getworkhours.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md)

