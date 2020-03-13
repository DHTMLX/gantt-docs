unsetWorkTime
=============

@short:
	unsets a working time in the Gantt Chart

@params:

- config	object	the configuration object of a time span



@example:

gantt.config.work_time = true;
 
// changes the working time of working days from ["8:00-17:00"] to ["9:00-18:00"]
gantt.setWorkTime({ hours:["9:00-18:00"] });
// unsets the working time
gantt.unsetWorkTime({ hours:["9:00-18:00"] });

@template:	api_method
@descr:
added in version 4.1

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
		<td rowspan=2><b id="day">day</b></td>
        <td> a number of a week day  [0 (<i>Sunday</i>) - 6 (<i>Saturday</i>)]. Note, you can set only 1 day at once</td>
    </tr>
    <tr>
		<td colspan=2 style="text-align:left !important; ">
~~~js
//makes all Mondays day-offs
gantt.unsetWorkTime({ day:1, hours:false }); 
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
gantt.unsetWorkTime({date:new Date(2013,0,1), hours:false})
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
gantt.unsetWorkTime({day : 5, hours : ["8:00-12:00"]});
~~~
		</td>
	</tr>
	</tbody>
</table>


@related:
desktop/working_time.md#unsettingtheworkingtime

@relatedapi:
	api/gantt_work_time_config.md
	api/gantt_setworktime.md
	api/gantt_isworktime.md
    
@relatedsample:
	09_worktime/01_working_hours_per_day.html