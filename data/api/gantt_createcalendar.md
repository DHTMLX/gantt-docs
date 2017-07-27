createCalendar
=============


@todo:
	check 

@short:
	creates a working calendar at the task or resource level

@params:

- parentCalendar			object			(optional) an existing calendar that is used for creating a new one on the base of it		



@example:
// creating a full-time calendar (7 working days per week, 24 hours per day)
var newCalendar = gantt.createCalendar();

// creating a new calendar on the base of an existing one (copying it)
var newCalendar = gantt.createCalendar(parentCalendar);



@template:	api_method
@descr:

@relatedapi:
api/gantt_deletecalendar.md
