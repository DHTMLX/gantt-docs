isWorkTime
=============


@short:checks whether the specified date is working or not
	

@params:
- config	object|Date		either the configuration object of a time span or a specific date


@returns:
- isWorkTime	boolean		<i>true</i>, if the specified date is working time. Otherwise, <i>false</i>

@example:
//checks whether the specified date is a working day in global settings
gantt.isWorkTime({ date: new Date(2017,3,5) });
// or
gantt.isWorkTime(new Date(2017,3,5));

//checks whether the specified date is working day for a specific task
gantt.isWorkTime({date: new Date(2017,3,5), task: task});


@template:	api_method
@related:
	desktop/working_time.md
@relatedapi:
	api/gantt_work_time_config.md
	api/gantt_setworktime.md
    api/gantt_getworkhours.md
@descr:

{{note
If the api/gantt_work_time_config.md option is disabled, the method always returns `true`. 
}}

- The method will use the [global work time calendar](desktop/working_time.md#getcalendars) if no task is specified. <br>
- Besides, the method can be called directly from a [calendar object](api/gantt_calendar_other.md).


Let's  assume that you set the following working time for the chart:

- **Working days**: Monday - Friday
- **Working hours**: 6:00 - 15:00

Then, if you check Monday April,1 2013 as in, you will get: 

~~~js
gantt.isWorkTime({date: new Date(2013,3,1,17,00), unit: "hour"}); 
//->false, cause 17:00-18:00 is not working time

gantt.isWorkTime({date: new Date(2013,3,1,17,00), unit:  "day"}); 
//-> true, cause Monday is a working day
~~~

##Configuration object properties

The configuration object can contain the following properties:

- **date** - (*Date*) a date to check 
* **unit** - (string)	optional, a time unit: "minute", "hour", "day", "week", "month", "year"
* **task** - (*object*)	optional, the object of the task the duration of which should be calculated

~~~js
if (gantt.isWorkTime({date: date, task: task})){
    alert("worktime of task" + task.text);
}
~~~
