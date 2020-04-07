addCalendar
=============

@short:
	adds a calendar into Gantt

@params:
- calendar		object		an object with configuration of the calendar


@returns:
- calendarId		number		the id of the calendar

@example:

// adding a previously created calendar
var calendarId = gantt.addCalendar(calendar);

// adding a calendar with a new config
var calendarId = gantt.addCalendar({
	id:"custom", // optional
	worktime: {
		hours: ["8:00-17:00"],
		days: [ 1, 1, 1, 1, 1, 1 ,1]
	}
});

var calendar = gantt.getCalendar(calendarId);

@template:	api_method
@descr:
The calendar configuration object can contain the following attributes:

- **id** - (id) optional, the calendar id
- **worktime** - (object) an object that sets the worktime in days and hours. It can include:
	- **hours** - (array) an array with global working hours, sets the start and end hours of the task
    - **days** - (array) an array of 7 days of the week (from 0 - Sunday, to 6 - Saturday), where 1/true stands for a working day and 0/false - a non-working day.    

###Setting individual working hours for a day

Instead of the number of a week day, you can also set custom working hours for this day.<br>
For example:  

~~~js
var calendar = {
    id:"calendar1", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: [ 0, 1, 1, 1, ["12:00-17:00"], 1, 0]
    }
}
~~~

where ["12:00-17:00"] are working hours from 12 pm to 17 pm for Thursday.

    
@relatedsample:

09_worktime/06_task_calendars.html
09_worktime/07_resource_calendars.html

@relatedapi:
api/gantt_getcalendar.md
api/gantt_createcalendar.md
api/gantt_deletecalendar.md
api/gantt_calendar_other.md

@related:
desktop/working_time.md#multipleworktimecalendars

@changelog:
added in version 4.2