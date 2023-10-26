mergeCalendars
=============

@short: merges several working calendars into one

@params:
- calendars		array		an array of calendars' objects

@example:
const johnCalendarId = gantt.addCalendar({
    worktime: {
        hours: ["0:00-24:00"],
        days: [0, 1, 1, 1, 1, 1, 0]
    }
});
const mikeCalendarId = gantt.addCalendar({
    worktime: {
        hours: ["8:00-12:00", "13:00-17:00"],
        days: [0, 1, 1, 1, 1, 1, 0]
    }
});

// pass an array of calendars as an argument
const joinedCalendar = gantt.mergeCalendars([
    gantt.getCalendar(mikeCalendarId),
    gantt.getCalendar(johnCalendarId)
]);

@template:	api_method
@descr:
You can also specify a set of [objects of calendars](api/gantt_calendar_other.md) as parameters of the **mergeCalendars** method:

~~~js
// pass calendars as arguments
const joinedCalendar = gantt.mergeCalendars(
    gantt.getCalendar(mikeCalendarId),
    gantt.getCalendar(johnCalendarId)
);
~~~

### Logic for merging calendars

When merging calendars, the following logic applies - the day of the week in the new calendar will be considered a working day (1/true) only if it is a working day in all merged calendars (Logical AND (&&)):

~~~html
// calendar 1 + calendar 2 = merged calendar;

// Case 1: 
// working day (1/true) + working day (1/true) = working day (1/true);

// Case 2: 
// working day (1/true) + non-working day (0/false) = non-working day (0/false);

// Case 3: 
// non-working day (0/false) + non-working day (0/false) = non-working day (0/false);
~~~

So, if we have two calendars:

- the first one with working days: Monday and Wednesday:

~~~js
const calendar1Id = gantt.addCalendar({
    id: "calendar1",
    worktime: {
        days: [ 0, 1, 0, 1, 0, 0, 0 ]
    }
});
~~~

- the second one with working days: Monday, Tuesday and Thursday:

~~~js
const calendar2Id = gantt.addCalendar({
    id: "calendar2",
    worktime: {
        days: [ 0, 1, 1, 0, 1, 0, 0 ]
    }
});
~~~

When the calendars merge:

~~~js
const joinedCalendar = gantt.mergeCalendars([
    gantt.getCalendar(calendar1Id),
    gantt.getCalendar(calendar2Id)
]);
~~~

we get a new calendar with working days only on Mondays:

~~~html
// days: [ 0, 1, 0, 1, 0, 0, 0 ]

// +

// days: [ 0, 1, 1, 0, 1, 0, 0 ]

// =

// days: [ 0, 1, 0, 0, 0, 0, 0 ]
~~~

**Related sample:** [Gantt. Merge work calendars (via mergeCalendars() method)](https://snippet.dhtmlx.com/56vubu7a)

{{note The logic does not take into account [customWeeks](api/gantt_addcalendar.md).}}

@changelog: added in v7.0

@related: desktop/working_time.md#assigningcalendartoresource

@relatedapi: api/gantt_calendar_other.md
api/gantt_getcalendar.md
api/gantt_getresourcecalendar.md
