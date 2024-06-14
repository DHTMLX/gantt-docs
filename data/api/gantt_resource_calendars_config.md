resource_calendars
=============

@short:
defines a set of working calendars that can be assigned to a specific resource, e.g. a user

@type: object

@default:{}
@example:
gantt.config.resource_property = "user"
gantt.config.resource_calendars = {
      1 : gantt.addCalendar({
          worktime: {
             days: [0, 1, 1, 1, 1, 1, 0]
          }
     })
};

// assigning the calendar to a particular task
{"id":3, user:"1", "text":"Task #2", "start_date":"11-04-2013", 
    "duration":"4", "parent":"1", "progress": 0.6, "open": true}
    
@template:	api_config
@descr:

{{pronote This functionality is available in the PRO edition only.}}

- <span class=subproperty>**[resourceId: string | number]**</span> - (*string | number | {[resourceId: string | number]: string | number | undefined } | undefined*) - mapping of the resource calendar


Before version 7.0, dhtmlxGantt used a slightly different format of **resource_calendars**.

The new way of assigning a working calendar to a user described above is easier and more convenient to use but the old configuration of the **resource_calendars** property will also  work:

~~~js
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
~~~

@changelog: 
- added in version 4.2
- the format of the config is changed in version 7.0

@related:
desktop/working_time.md#assigningcalendartoresource

@relatedapi:
api/gantt_addcalendar.md
api/gantt_dynamic_resource_calendars_config.md
api/gantt_getresourcecalendar.md

@edition:pro