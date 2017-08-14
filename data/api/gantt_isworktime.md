isWorkTime
=============

@todo:check details

@short:checks whether the specified date is working or not
	

@params:
- date			Date		a date to check 
* time_unit		string		optional, a time unit: "minute", "hour", "day", "week", "month", "year"
* task			object		optional, the object of the task the duration of which should be calculated

@returns:
- isWorkTime	boolean		<i>true</i>, if the specified date is working time. Otherwise, <i>false</i>

@example:
//checks wether the specified day (5 April, Friday) is working
gantt.isWorkTime(new Date(2013,3,5));

//checks whether the specified hour (5 April, Friday 14:00 - 15:00) is working
gantt.isWorkTime(new Date(2013,3,5,14,00), "hour");


@template:	api_method
@related:
	desktop/working_time.md
@relatedapi:
	api/gantt_work_time_config.md
	api/gantt_setworktime.md
    api/gantt_getworkhours.md
@descr:
Let's  assume that you set the following working time for the chart:

- **Working days**: Monday - Friday
- **Working hours**: 6:00 - 15:00

Then, if you check Monday April,1 2013 as in, you will get: 

~~~js
gantt.isWorkTime(new Date(2013,3,1,17,00), "hour"); 
//->false, cause 17:00-18:00 is not working time

gantt.isWorkTime(new Date(2013,3,1,17,00), "day"); 
//-> true, cause Monday is a working day
~~~

The method can also take as a parameter the configuration object of a time span:

~~~js
if (gantt.isWorkTime({date: date, task: task})){
    alert("worktime of task" + task.text);
}
~~~
