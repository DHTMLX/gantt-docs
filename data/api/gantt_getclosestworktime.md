getClosestWorkTime
=============

@short: returns the closest working time
	

@params:
- config	object		the configuration object 


@returns: 
- date		Date	a Date object of the closest working time 

@related:
	desktop/working_time.md
@relatedapi:
	api/gantt_work_time_config.md
	api/gantt_setworktime.md
    api/gantt_getworkhours.md

@example:
// checks whether the specified date is a working day in global settings
gantt.getClosestWorkTime({date:new Date(2019,04,26)});
// or
gantt.getClosestWorkTime(new Date(2019,04,26));

// checks whether the specified date is a working day for a specific task
gantt.getClosestWorkTime({ date: new Date(2019,04,26), task:task });

@template:	api_method
@descr:

{{note
If the api/gantt_work_time_config.md option is disabled, the method returns the date unchanged. 
}}

- The method will use the [global work time calendar](desktop/working_time.md#getcalendars) if no task is specified. <br>
- Besides, the method can be called directly from a [calendar object](api/gantt_calendar_other.md).


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
		<td rowspan=2><b id="date">date</b></td>
        <td>a date to get the closest working time for</td>
    </tr>
    <tr>
		<td colspan=2 style="text-align:left !important; ">
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
		<td rowspan=2><b id="dir">dir</b></td>
        <td> (<i>'future'</i> or <i>'past'</i>) specifies the direction of the closest time</td>
    </tr>
    <tr>
		<td colspan=2 style="text-align:left !important; ">
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
		<td rowspan=2><b id="unit">unit</b></td>
        <td> a time unit to search for the closest working time</td>
    </tr>
    <tr>
		<td colspan=2 style="text-align:left !important; ">
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
		<td rowspan=2><b id="unit">task</b></td>
        <td> optional, the object of the task the duration of which should be calculated</td>
    </tr>
    <tr>
		<td colspan=2 style="text-align:left !important; ">
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

