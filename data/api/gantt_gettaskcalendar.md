getTaskCalendar
=============


@todo:
	check 

@short:
	gets a calendar assigned to the specified task (a task level calendar)

@params:
- task		object		the object of a task 

@returns:
- task_calendar		object		the object of the task's calendar


@example:
var task_calendar = gantt.getTaskCalendar({
	"id":2, 
	"calendar_id":"custom", 
	"text":"Task #1", 
	"start_date":"02-04-2013",
	"parent":"1", 
	"progress":0.5, 
	"open": true
});


@template:	api_method
@descr:
added in version 4.2

The returned object of the task calendar for the above example is:

~~~js
{
	id:"custom",
	worktime: {
		hours: [8, 17],
		days: [ 1, 1, 1, 1, 1, 1, 1]
	}
}
~~~

@relatedsample:
09_worktime/06_task_calendars.html

@relatedapi:
api/gantt_getcalendar.md
api/gantt_getcalendars.md