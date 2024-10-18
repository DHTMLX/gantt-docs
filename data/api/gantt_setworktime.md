setWorkTime
=============
@short: sets the working time for the Gantt chart
	

@params:
- config	object	the configuration object of a time span


@example:
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

@template:	api_method
@related:
	desktop/working_time.md
@relatedapi:
	api/gantt_work_time_config.md
	api/gantt_unsetworktime.md
	api/gantt_isworktime.md
 
@relatedsample:
	09_worktime/01_working_hours_per_day.html

@descr:
{{note
The method makes sense only if  api/gantt_work_time_config.md is set to 'true'. Otherwise, the method will be ignored.
}}

- The method will use the [global work time calendar](desktop/working_time.md#getcalendars) if no task is specified. <br>
- Besides, the method can be called directly from a [calendar object](api/gantt_calendar_other.md).


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
		<td rowspan=2><b id="day">day</b></td>
        <td> a number of a week day  [0 (<i>Sunday</i>) - 6 (<i>Saturday</i>)]. Note, you can set only 1 day at once</td>
    </tr>
    <tr>
		<td colspan=2 style="text-align:left !important; ">
~~~js
//makes all Mondays day-offs
gantt.setWorkTime({ day:1, hours:false }); 
~~~
		</td>
	</tr>
	<tr>
		<td rowspan=2><b id="date">date</b></td>
        <td> a specific date to set as a working day or day off</td>
    </tr>
    <tr>
		<td colspan=2 style="text-align:left !important; ">
~~~js
//makes a specific date a day-off
gantt.setWorkTime({date:new Date(2013,0,1), hours:false})
~~~
		</td>
	</tr>
    <tr>
		<td rowspan=2><b id="hours">hours</b></td>
        <td> an array of working hours as 'from'-'to' pairs. <br><i>'false'</i> value sets a day-off, <i>'true' (default value)</i> applies the default hours (["8:00-17:00"])</td>
    </tr>
    <tr>
		<td colspan=2 style="text-align:left !important; ">
~~~js
//sets the working time for Fridays from 8:00 till 12:00
gantt.setWorkTime({day : 5, hours : ["8:00-12:00"]});
~~~
		</td>
	</tr>
	<tr>
		<td rowspan=2><b id="hours">customWeeks</b></td>
        <td> an object with different working-time rules for different periods of time.<br> The object can contain a set of <i>key:value</i> pairs where <i>key</i> is the name of a time span and <i>value</i> is an object that includes the following attributes:
		<ul>
            <li><b>from</b> - (<i>Date</i>) mandatory, the date when the time span is scheduled to begin</li>
            <li><b>to</b> - (<i>Date</i>) mandatory, the date when the time span is scheduled to be completed</li>
            <li><b>hours</b> - (<i>array</i>) an array of working hours as 'from'-'to' pairs. <br><i>'false'</i> value sets a day-off, <i>'true' (default value)</i> applies the default hours (["8:00-17:00"])</li>
            <li><b>days</b> - (<i>array</i>) an array of 7 days of the week (from 0 - Sunday, to 6 - Saturday), where 1/true stands for a working day and 0/false - a non-working day.</li>
		</ul>
		</td>
    </tr>
    <tr>
		<td colspan=2 style="text-align:left !important; ">
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

### Setting working time hours for the night shift

Working time settings for the **hours** attribute of the [setWorkTime](api/gantt_setworktime.md) method' config object should be specified from 
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

###Re-writing a working time rule

Note, each next call of the method for the same date will re-write the previous working-time rule:

~~~js
gantt.setWorkTime({hours:["8:00-12:00"]});
gantt.setWorkTime({hours:["13:00-17:00"]});
//the result of the above commands will be the working time 13:00-17:00
//and not a mixin of both commands
~~~


@changelog: 
- the **customWeeks** property is added in v7.1;
- the format of the **hours** property of the config is changed in version 7.0.
