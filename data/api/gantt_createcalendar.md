createCalendar
=============


@todo:
	check 

@short:
	creates a working calendar

@params:

* parentCalendar			object			(optional) an existing calendar that is used for creating a new one on the base of it		



@example:
// creating a full-time calendar (7 working days per week, 24 hours per day)
var calendar1 = gantt.createCalendar();

// creating a new calendar on the base of an existing one (copying it)
var calendar2 = gantt.createCalendar(parentCalendar);



@template:	api_method
@descr:
added in version 4.2

After you've created a calendar, you need to add it into Gantt via the api/gantt_addcalendar.md method:

~~~js
gantt.addCalendar(calendar1);
~~~


@relatedapi:
api/gantt_addcalendar.md
api/gantt_deletecalendar.md
api/gantt_calendar_other.md

@related:
desktop/working_time.md#multipleworktimecalendars