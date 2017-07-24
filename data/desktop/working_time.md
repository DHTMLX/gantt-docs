Calculating Tasks' Duration in Work Time
===================================================
By default, dhtmlxGantt calculates the duration of tasks in calendar time. That assumes 
that the final duration of the tasks can include weekends and holidays.

To provide calculating tasks' duration in work time, use the api/gantt_work_time_config.md option:

{{snippet
Enabling the mode when tasks' duration is calculated in working time
}}
~~~js
gantt.config.work_time = true; 	// removes non-working time from calculations /*!*/
gantt.config.skip_off_time = true; /*!*/   // hides non-working time in the chart
 
gantt.init("gantt_here");
~~~

{{sample
09_worktime/02_working_days.html
}}

{{note
Depending on the value of api/gantt_duration_unit_config.md, dhtmlxGantt calculates the tasks' duration in different time units (e.g. if
duration_unit = "hour", the duration is calculated in the working hours). 
}}

<img style="padding-top:25px;" src="desktop/calculating_different_time.png"/>


Setting the working time
------------------------------
The default working time is the following:

- Working days:  Monday - Friday.
- Working hours: 08:00 - 17:00.

(*hours configuration is taken into account only when api/gantt_duration_unit_config.md is less than a day (hours or minutes)*).

<br>

To change the default working time, use the api/gantt_setworktime.md method:

{{snippet
Setting a custom working time
}}
~~~js
//changes the working time of working days
gantt.setWorkTime({ hours:[9,18] });

//makes all Fridays days-off
gantt.setWorkTime({ day:5, hours:false });

//changes the working time for Fridays and Saturdays
gantt.setWorkTime({day : 5, hours : [8,12]});
gantt.setWorkTime({day : 6, hours : [8,12]});

//makes a specific date a working day 
gantt.setWorkTime({date : new Date(2013, 2, 31)});

//makes a specific date a day-off
gantt.setWorkTime({date:new Date(2013,0,1), hours:false})
~~~

{{sample
09_worktime/04_custom_workday_duration.html
}}

Note, each next call of the method for the same date will re-write the previous working-time rule. So, if you need to unset some rule, call the api/gantt_setworktime.md method with other configuration: 

~~~js
gantt.setWorkTime({hours:[8,12]});
gantt.setWorkTime({hours:[13,17]});
//the result of following commands will be the working time 13:00-17:00
//and not a mixin of both commands
~~~

Unsetting the working time
------------------------------

You can unset a working time by using the api/gantt_unsetworktime.md method:

~~~js
//changes the working time of working days from [8,17] to [8,12]
gantt.setWorkTime({hours:[8,12]});
//unsets the working time
gantt.unsetWorkTime({hours:[8,12]});
~~~


Checking the working time
------------------------------------
To check whether the specified date is working time, use the api/gantt_isworktime.md method:

~~~js
//makes 1 January, 2013 a day off
gantt.setWorkTime({date:new Date(2013,0,1), hours:false});
gantt.isWorkTime(new Date(2013,0,1)) // -> false  /*!*/

// makes 15 March, 2013 a working day from 9:00 till 18:00 
gantt.setWorkTime({date : new Date(2013, 2, 15), hours:[9,18]});
gantt.isWorkTime(new Date(2013, 2, 15,10,0), "hour"); // -> true  /*!*/
gantt.isWorkTime(new Date(2013, 2, 15,8,0), "hour"); // ->false  /*!*/
~~~
{{sample
09_worktime/05_adjust_to_worktime.html
}}

Getting the working time
-----------------------------------
To get the working hours of the specified date, use the api/gantt_getworkhours.md method:

~~~js
gantt.getWorkHours(new Date(2013,3,30))// -> [8, 17]
~~~


To get the closest working day to the specified date, use the api/gantt_getclosestworktime.md method:

~~~js
gantt.getClosestWorkTime(new Date(2013,3,30)); 
~~~


Coloring the day-off times
------------------------------------
To color the day-off times in the chart area, use the api/gantt_task_cell_class_template.md template:

~~~js
gantt.templates.task_cell_class = function(task, date){
	if(!gantt.isWorkTime(date))
		return "week_end";
	return "";
};
~~~
{{sample
09_worktime/04_custom_workday_duration.html
}}

<br>

Learn more in the desktop/highlighting_time_slots.md article.

{{note
To hide the day-off time, use the technique described in the article - desktop/custom_scale.md
}}