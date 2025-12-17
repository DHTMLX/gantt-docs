---
sidebar_label: setWorkTime
title: setWorkTime method
description: "sets the working time for the Gantt chart"
---

# setWorkTime

### Description

@short: Sets the working time for the Gantt chart

@signature: setWorkTime: Calendar['setWorkTime']

### Parameters

- `config` - (required) *object* - the configuration object of a time span

### Example

~~~jsx
gantt.config.work_time = true;

//changes the working time of working days from ["8:00-17:00"] to ["9:00-18:00"]
gantt.setWorkTime({ hours:["9:00-18:00"] });
 
//makes all Fridays day-offs
gantt.setWorkTime({ day:5, hours:false });
 
//changes the working time for Fridays and Saturdays 
// from ["8:00-17:00"] to ["8:00-12:00"]
gantt.setWorkTime({day : 5, hours : ["8:00-12:00"]});
gantt.setWorkTime({day : 6, hours : ["8:00-12:00"]});
 
//makes March 31 a working day 
gantt.setWorkTime({date : new Date(2013, 2, 31)});
 
//makes January 1 a day-off
gantt.setWorkTime({date:new Date(2013,0,1), hours:false})

//sets working time as 2 periods: 8:30-12:00, 13:00-17:00 (to keep time for lunch)
gantt.setWorkTime({hours : ["8:30-12:00", "13:00-17:00"]})
~~~

### Related samples
- [Calculate working hours](https://docs.dhtmlx.com/gantt/samples/09_worktime/01_working_hours_per_day.html)

### Details

:::note
The method makes sense only if [work_time](api/config/work_time.md) is set to 'true'. Otherwise, the method will be ignored.
:::

- The method will use the [global work time calendar](guides/working-time.md#multipleworktimecalendars) if no task is specified. 
- Besides, the method can be called directly from a [calendar object](api/other/calendar.md).


The default working time is the following:

- **Working days**: Monday - Friday.
- **Working hours**: 08:00 - 17:00.

The method is used to alter the default settings.

Configuration object properties
---------------------------------------

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
//makes all Mondays day-offs
gantt.setWorkTime({ day:1, hours:false }); 
~~~
		</td>
	</tr>
	<tr>
		<td rowspan="2"><b id="date">date</b></td>
  <td> a specific date to set as a working day or day off</td>
  </tr>
  <tr>
		<td colspan="2" style="text-align:left !important; ">
~~~js
//makes a specific date a day-off
gantt.setWorkTime({date:new Date(2013,0,1), hours:false})
~~~
		</td>
	</tr>
  <tr>
		<td rowspan="2"><b id="hours">hours</b></td>
  <td> an array of working hours as 'from'-'to' pairs. <br/><i>'false'</i> value sets a day-off, <i>'true' (default value)</i> applies the default hours (["8:00-17:00"])</td>
  </tr>
  <tr>
		<td colspan="2" style="text-align:left !important; ">
~~~js
//sets the working time for Fridays from 8:00 till 12:00
gantt.setWorkTime({day : 5, hours : ["8:00-12:00"]});
~~~
		</td>
	</tr>
	<tr>
		<td rowspan="2"><b id="hours">customWeeks</b></td>
  <td> an object with different working-time rules for different periods of time.<br/> The object can contain a set of <i>key:value</i> pairs where <i>key</i> is the name of a time span and <i>value</i> is an object that includes the following attributes:<ul><li><b>from</b> - (<i>Date</i>) mandatory, the date when the time span is scheduled to begin</li><li><b>to</b> - (<i>Date</i>) mandatory, the date when the time span is scheduled to be completed</li><li><b>hours</b> - (<i>array</i>) an array of working hours as 'from'-'to' pairs. <br/><i>'false'</i> value sets a day-off, <i>'true' (default value)</i> applies the default hours (["8:00-17:00"])</li><li><b>days</b> - (<i>array</i>) an array of 7 days of the week (from 0 - Sunday, to 6 - Saturday), where 1/true stands for a working day and 0/false - a non-working day.</li></ul></td>
  </tr>
  <tr>
		<td colspan="2" style="text-align:left !important; ">
~~~js
//changes the working time for winter months
gantt.setWorkTime({
	customWeeks: {
		winter: {
			from: new Date(2018, 11, 1), // December 1st, 2018
			to: new Date(2019, 2, 1), // March 1st 00:00, 2019
			hours: ["9:00-13:00", "14:00-16:00"],
			days: [ 1, 1, 1, 1, 0, 0, 0]
		}
	}
});
~~~
		</td>
	</tr>
	</tbody>
</table>


## Setting working time hours for the night shift

Working time settings for the **hours** attribute of the [setWorkTime](api/method/setworktime.md) method' config object should be specified from 
the lesser interval to the greater one, that is in the ascending order. In case time settings are provided in the descending order, part of them 
will be ignored. In the example below the time intervals after `18:00` will be ignored:

~~~js
// the settings below are incorrect 
gantt.setWorkTime({day : 5, hours : ["16:00-18:00", "14:00-15:00",  "08:00-10:00"]});
gantt.setWorkTime({day : 5, hours : ["16:00-18:00", "00:00-04:00",  "05:00-06:00"]});
~~~

If you need to specify working time settings for the night shift, you should set them in the following way: 

- within 24 hours for the first day
- within 24 hours for the following day

For example:

~~~js
gantt.setWorkTime({day : 5, hours : ["16:00-18:00"]});
gantt.setWorkTime({day : 6, hours : ["00:00-04:00",  "05:00-06:00"]});
~~~

## Re-writing a working time rule

Note, each next call of the method for the same date will re-write the previous working-time rule:

~~~js
gantt.setWorkTime({hours:["8:00-12:00"]});
gantt.setWorkTime({hours:["13:00-17:00"]});
//the result of the above commands will be the working time 13:00-17:00
//and not a mixin of both commands
~~~

## Setting custom working days/days-off

Note that it is not possible to apply the working time settings that don't include any working days/hours. For example, in the following way:

~~~js
gantt.setWorkTime({ day: 0, hours: [] });
gantt.setWorkTime({ day: 1, hours: [] });
gantt.setWorkTime({ day: 2, hours: [] });
gantt.setWorkTime({ day: 3, hours: [] });
gantt.setWorkTime({ day: 4, hours: [] });
gantt.setWorkTime({ day: 5, hours: [] });
gantt.setWorkTime({ day: 6, hours: [] });
~~~

As a result, Gantt will ignore applying the method to one of the working days, and it will still contain working hours. 

If you tried to calculate the nearest working time or duration from some date, there would be neither such date, nor duration.
It means that setting such a calendar doesn't make any sense. Even if you set certain dates with working hours, it wouldn't work correctly, 
since Gantt can calculate dates only within a date range that contains working days/hours. Trying to calculate dates out of
the range would result in the absence of the date and various errors. 

If you want to make a calendar where some months or even years have only non-working days, you should use the *customWeeks* setting of the **setWorkTime()** method. 
In order to specify working days/hours within the necessary range, you need to:

- divide it into periods without working hours
- set working hours for the necessary dates

~~~js
gantt.setWorkTime({ date: new Date(2025, 3, 10), hours: ["8:00-12:00"] })
gantt.setWorkTime({ date: new Date(2025, 3, 11), hours: ["13:00-17:00"] })

gantt.setWorkTime({
    customWeeks: {
        period1: {
            from: new Date(2025, 3, 1),
            to: new Date(2025, 3, 10),
            hours: false,
        },

        period2: {
            from: new Date(2025, 3, 12),
            to: new Date(2025, 5, 1),
            hours: false,
        },

    }
});
~~~

:::note
sample: [Using `customWeeks` to make all days in the calendar days-off ](https://snippet.dhtmlx.com/i0o74zg7)
:::

### Related API
- [work_time](api/config/work_time.md)
- [unsetWorkTime](api/method/unsetworktime.md)
- [isWorkTime](api/method/isworktime.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md)

### Change log
- the **customWeeks** property is added in v7.1;
- the format of the **hours** property of the config is changed in version 7.0.

