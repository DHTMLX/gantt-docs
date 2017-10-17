deleteCalendar
=============

@short:
	deletes a task calendar by its id

@params:

- id		string,number		the id of the calendar


@example:
// adding a calendar
gantt.addCalendar({
    id:"custom",
    worktime: {
        hours: [8, 17],
        days: [ 1, 1, 1, 1, 1, 1 ,1]
    }
});

// deleting a calendar
gantt.deleteCalendar("custom");

@template:	api_method
@descr:
added in version 4.2

@relatedapi:
api/gantt_addcalendar.md
api/gantt_createcalendar.md

@related:
desktop/working_time.md#multipleworktimecalendars