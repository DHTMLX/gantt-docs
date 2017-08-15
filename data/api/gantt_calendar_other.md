calendar
=============

@todo:
	check 


@short:
	the interface of the working calendar object

@type:object

@example:


@template:	api_config
@descr:

The **calendar** object possesses the following methods and properties:

###Methods

- **setWorkTime(config)** - sets the working time for the Gantt chart
	- **_config_** - (*object*) the [configuration object](api/gantt_setworktime.md#configurationobjectproperties) of a time span
~~~js
calendar.setWorkTime({ hours:[9,18] });
~~~
- **unsetWorkTime(config)** unsets a working time in the Gantt Chart
	- **_config_** - (*object*) the [configuration object](api/gantt_unsetworktime.md#configurationobjectproperties) of a time span
~~~js
calendar.unsetWorkTime({ hours:[9,18] });
~~~
- **isWorkTime(date[,time_unit])** checks whether the specified date is working 
	- **_date_** - (*Date*)	a date to check
	- **_time_unit_** - (*string*)	optional, a time unit: "minute", "hour", "day", "week", "month", "year"<br>
    or
	- **_config_** - (*object*) the [configuration object](api/gantt_isworktime.md#configurationobjectproperties) of a time span
~~~js
var calendar = gantt.getTaskCalendar(task);
if (calendar.isWorkTime({date: date})){
    alert("worktime of task" + task.text);
}
~~~
- **getClosestWorkTime(config)** - returns the closest working time
	- **_config_** - (*object*)	the [configuration object](api/gantt_getclosestworktime.md#configurationobjectproperties)
~~~js
calendar.getClosestWorkTime({
    date:new Date(2013,0,1), 
    dir:"future", 
    unit:"hour"
});
~~~
- **calculateEndDate(start,duration[,unit])** - calculates the end date of a task
	- **_start_** - (*Date*) the date when a task is scheduled to begin
	- **_duration_** - (*number*) the duration of a task
	- **_unit_** - (*string*) optional, the time unit of the duration<br>
    or
	- **_config_** - (*object*) the [configuration object](api/gantt_calculateenddate.md#configurationobjectproperties) of a time span
~~~js
var end_date = calendar.calculateEndDate({start_date:date, duration:duration});
~~~
- **calculateDuration(start,end)** - calculates the duration of a task 
	- **_start_** -  (*Date*) the date when a task is scheduled to begin
	- **_end_**	- (*Date*) the date when a task is scheduled to be completed<br>
    or
	- **_config_** - (*object*) the [configuration object](api/gantt_getclosestworktime.md#configurationobjectproperties) of a time span
~~~js
calendar.calculateDuration(new Date(2013,02,15), new Date(2013,02,25));
~~~

###Properties

- **id** - (*id*) the id of a task's calendar 

@relatedapi:
- api/gantt_addcalendar.md
- api/gantt_getcalendar.md
- api/gantt_createcalendar.md

@related:
desktop/working_time.md#assigningcalendartotask