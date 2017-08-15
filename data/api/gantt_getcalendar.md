getCalendar
=============


@short:
	gets the global calendar of tasks

@params:
- id		id		the id of the global calendar or "global"

@returns:
- config		object		the config of the global calendar


@example:

var calendar = gantt.getCalendar(id);

@template:	api_method
@descr:
added in version 4.2

The config of a global task calendar is as follows:

~~~js
{
    id:"global",
    worktime: {
        hours: [8, 17],
        days: [ 0, 1, 1, 1, 1, 1, 0]
    }
}
~~~

The default working time is the following:

- Working days are from Monday to Friday.
- Working hours are from 08:00 to 17:00.


@related:
desktop/working_time.md#multipleworktimecalendars
@relatedapi:
api/gantt_getcalendars.md
api/gantt_gettaskcalendar.md

