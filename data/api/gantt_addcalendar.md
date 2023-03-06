addCalendar
=============

@short:
	adds a calendar into Gantt

@params:
- calendar		object		an object with configuration of the calendar


@returns:
- calendarId		string		the id of the calendar

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
    - **days** - (array) an array of 7 days of the week (from 0 - Sunday, to 6 - Saturday), where 1/true stands for a working day and 0/false - a non-working day
    - **customWeeks** - (object) an object that sets different working-time rules for different time spans. The object can contain a set of <i>key:value</i> pairs where <i>key</i> is the name of a time span which can be arbitrary and <i>value</i> is an object that includes the following attributes:
        - <b>from</b> - (<i>Date</i>) mandatory, the date when the time span is scheduled to begin
        - <b>to</b> - (<i>Date</i>) mandatory, the date when the time span is scheduled to be completed
        - <b>hours</b> - (<i>array</i>) an array of working hours as 'from'-'to' pairs. <br><i>'false'</i> value sets a day-off, <i>'true' (default value)</i> applies the default hours (["8:00-17:00"])
        - <b>days</b> - (<i>array</i>) an array of 7 days of the week (from 0 - Sunday, to 6 - Saturday), where 1/true stands for a working day and 0/false - a non-working day    

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


### Setting worktime for different time intervals

There is the ability to configure different working time rules for different periods of time by using the **customWeeks** attribute:

~~~js
// adding a calendar with a new config
gantt.addCalendar({
	id:"default", // optional
	worktime: {
		hours: ["8:00-17:00"],
		days: [ 1, 1, 1, 1, 1, 1 ,1],
		customWeeks: {
			winter: {
				from: new Date(2020, 11, 1),// December 1st, 2020
				to: new Date(2021, 2, 1),// March 1st 00:00, 2021
				hours: ["9:00-13:00", "14:00-16:00"],
				days: [ 1, 1, 1, 1, 0, 0, 0]
			}
		}
	}
});


~~~
    
@relatedsample:

09_worktime/06_task_calendars.html
09_worktime/07_resource_calendars.html
09_worktime/12_calendar_ranges.html

@relatedapi:
api/gantt_getcalendar.md
api/gantt_createcalendar.md
api/gantt_deletecalendar.md
api/gantt_calendar_other.md

@related:
desktop/working_time.md#multipleworktimecalendars

@changelog:
- the **customWeeks** property is added in v7.1;
- added in version 4.2