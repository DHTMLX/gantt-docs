resource_calendars
=============

@short:
defines a set of working calendars that can be assigned to a specific resource, e.g. a user

@type: object

@default:{}
@example:
// adding a working calendar
var johnCalendarId = gantt.addCalendar({
    worktime: {
        days: [0, 1, 1, 1, 1, 1, 0]
    }
}),

// binding the calendar to a user
gantt.config.resource_calendars = {
  "user":{
      1 : johnCalendarId
   }
};

// assigning the calendar to a particular task
{"id":3, user:"1", "text":"Task #2", "start_date":"11-04-2013", 
    "duration":"4", "parent":"1", "progress": 0.6, "open": true}
    
@template:	api_config
@descr:
added in version 4.2

@related:
desktop/working_time.md#assigningcalendartoresource

@relatedapi:
api/gantt_addcalendar.md