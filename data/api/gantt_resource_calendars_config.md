resource_calendars
=============

@todo:
	check 


@short:
binds a working calendar to a particular attribute of a task

@type: object
@example:
// adding a working calendar
var johnCalendarId = gantt.addCalendar({
    worktime: {
        days: [0, 1, 1, 1, 1, 1, 0]
    }
}),

// binding the calendar to the "user" property of a task
gantt.config.resource_calendars = {
  "user":{
      1 : johnCalendarId,
      2 : mikeCalendarId,
      3 : annaCalendarId
   }
};

// assigning the calendar to a particular task
{"id":3, user:"2", "text":"Task #2", "start_date":"11-04-2013", 
    "duration":"4", "parent":"1", "progress": 0.6, "open": true}
    
@template:	api_config
@descr:
added in version 4.2

@related:
desktop/working_calendars.md

@relatedapi:
api/gantt_addcalendar.md