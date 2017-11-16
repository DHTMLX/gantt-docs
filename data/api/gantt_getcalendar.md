getCalendar
=============


@short:
	gets worktime calendar by id

@params:
- id		string,number		the id of the global calendar or "global"

@returns:
- config		object		calendar object


@example:

var calendar = gantt.getCalendar(id);

@template:	api_method
@descr:
added in version 4.2

The returned object for the above example is a [calendar object](api/gantt_calendar_other.md).

The default working time is the following:

- Working days are from Monday to Friday.
- Working hours are from 08:00 to 17:00.


@related:
desktop/working_time.md#multipleworktimecalendars
@relatedapi:
api/gantt_getcalendars.md
api/gantt_gettaskcalendar.md

