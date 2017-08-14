calendar
=============

@todo:
	check 


@short:
	an object of the working calendar for task or resource levels

@type:object

@example:
var calendar = {
    id:"calendar1", // optional
    worktime: {
        hours: [8, 17],
        days: [ 0, 1, 1, 1, 1, 1, 0]
    }
}

@template:	api_config
@descr:
The attributes of the working calendar object are:

- **id** - (*id*) optional, the calendar id
- **worktime** - (*object*) an object that sets the work time in days and hours. It can include:
	- **hours** - (*array*) an array with global working hours, sets the start and end hours of the task
	- **days** - (*array*) an array of 7 days of the week (from 0 - Sunday, to 6 - Saturday), where 1/true stands for a working day and 0/false - a non-working day

@related:
desktop/working_calendars.md

@relatedapi:
api/gantt_addcalendar.md
api/gantt_createcalendar.md