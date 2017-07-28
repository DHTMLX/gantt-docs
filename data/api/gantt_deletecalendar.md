deleteCalendar
=============


@todo:
	check 

@short:
	deletes an existing calendar by its id

@params:

- id		id		the id of the calendar



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

@relatedapi:
api/gantt_addcalendar.md
api/gantt_createcalendar.md