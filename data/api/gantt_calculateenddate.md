calculateEndDate
=============

@todo:check details

@short:calculates the end date of a task 

@params:
- start			Date			the date when a task is scheduled to begin
- duration		number	 		the duration of a task
* unit			string			optional, the time unit of the duration
* task			object			optional, the object of the task the duration of which should be calculated

@returns:
- end_date	Date	the date when a task is scheduled to be completed

	
@example:
gantt.config.work_time = true;
gantt.init("gantt_here");
 
gantt.calculateEndDate(new Date(2013,02,15),48,"hour");  //-> Fri Mar 22 2013 17:00:00


@template:	api_method
@descr:
{{note
If the api/gantt_work_time_config.md option is enabled, the method considers duration as working time. 
}}

The method can also take as a parameter the configuration object of a time span:

~~~js
var end_date = gantt.calculateEndDate({start_date:date, duration:duration, task:task});
// or
var end_date = gantt.calculateEndDate(task);
~~~

@relatedapi:
	api/gantt_calculateduration.md
    api/gantt_calculatetasklevel.md