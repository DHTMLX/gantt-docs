setWorkTime
=============
@short: sets the working time for the Gantt chart
	

@params:
- config	object	the configuration object of a time span


@example:
gantt.config.work_time = true;

//changes the working time of working days from [8,17] to [9,18]
gantt.setWorkTime({ hours:[9,18] });
 
//makes all Fridays day-offs
gantt.setWorkTime({ day:5, hours:false });
 
//changes the working time for Fridays and Saturdays from [8,17] to [8,12]
gantt.setWorkTime({day : 5, hours : [8,12]});
gantt.setWorkTime({day : 6, hours : [8,12]});
 
//makes March 31 a working day 
gantt.setWorkTime({date : new Date(2013, 2, 31)});
 
//makes January 1 a day-off
gantt.setWorkTime({date:new Date(2013,0,1), hours:false})

//sets working time as 2 periods: 8:00-12:00, 13:00-17:00 (to keep time for lunch)
gantt.setWorkTime({hours : [8, 12, 13, 17]})

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

The default working time is the following:

- **Working days**: Monday - Friday.
- **Working hours**: 08:00 - 17:00.

The method is used to alter the default settings.

<br>

Note, each next call of the method for the same date will re-write the previous working-time rule:

~~~js
gantt.setWorkTime({hours:[8,12]});
gantt.setWorkTime({hours:[13,17]});
//the result of following commands will be the working time 13:00-17:00
//and not a mixin of both commands
~~~

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
        <td> an array of working hours as 'from'-'to' pairs. <br><i>'false'</i> value sets a day-off, <i>'true' (default value)</i> applies the default hours ([8,17])</td>
    </tr>
    <tr>
		<td colspan=2 style="text-align:left !important; ">
~~~js
//sets the working time for Fridays from 8:00 till 12:00
gantt.setWorkTime({day : 5, hours : [8,12]});
~~~
		</td>
	</tr>
	</tbody>
</table>


