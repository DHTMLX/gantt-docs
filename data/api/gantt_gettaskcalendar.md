getTaskCalendar
=============

@short:
	gets a calendar assigned to the specified task (a task level calendar)

@params:
- task		string,number,object		the id or object of a task 

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

The returned object for the above example is a [calendar object](api/gantt_calendar_other.md). If the api/gantt_work_time_config.md option is disabled, method returns calendar with 24/7 working time enabled.


@relatedsample:
09_worktime/06_task_calendars.html

@related:
desktop/working_time.md#multipleworktimecalendars
@relatedapi:
api/gantt_getcalendar.md
api/gantt_getcalendars.md