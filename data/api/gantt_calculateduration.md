calculateDuration
=============

@todo:
	check changes

@short:
    calculates the duration of a task 

@params:
- start			Date		the date when a task is scheduled to begin
- end			Date	 	the date when a task is scheduled to be completed
* task			object		optional, the object of the task the duration of which should be calculated

@returns:
- duration		number		the duration of a task in units specified by the <a href="api/gantt_duration_unit_config.md">duration_unit</a> option


@example:
gantt.config.work_time = true;
gantt.init("gantt_here");

// calculating the duration for the whole calendar
gantt.calculateDuration(new Date(2013,02,15), new Date(2013,02,25)); /*!*/ //->6

@template:	api_method
@descr:
{{note
If the api/gantt_work_time_config.md option is enabled, the method calculates the task's duration in working time. 
}}

To calculate duration of a particular task, you should pass the third parameter - the task object. 

~~~js
gantt.calculateDuration(new Date(2013,03,01),new Date(2013,03,10),{
	"id":2, 
	"calendar_id":"custom", 
	"text":"Task #1", 
	"start_date":"02-04-2013",
	"parent":"1", 
	"progress":0.5, 
	"open": true
});
~~~

Note that the result of the calculation depends on the working calendar settings of a particular task. 
For example, if a task has the following working calendar assigned:

~~~js
{
	id:"custom",
	worktime: {
		hours: [8, 17],
		days: [ 1, 1, 1, 1, 1, 1 ,1]
	}
}
~~~

The task's duration is 9 days. In case this task didn't have any calendars assigned to it, its duration would be equal to 7 days.

@related:
- desktop/working_time.md
- <a href="desktop/task_object_operations.md#calculatingthetasksduration">Calculating the task's duration</a>

@relatedapi:
api/gantt_calculateenddate.md
api/gantt_calculatetasklevel.md