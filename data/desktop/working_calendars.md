Working Calendars at Task and Resource Levels
======================================

This feature allows you to set particular working schedules for separate tasks or groups of tasks with the help of individual calendars.
Thus you will be able to define and manage date and time for performing a particular task or a group of tasks united by some resource.

Despite these calendars don't have visual interface, they are taken into account while calculating schedules for separate tasks.

To add a calendar into Gantt, you should complete three simple steps:

1. [Initialize a calendar](desktop/working_calendars.md#creatingworkingcalendar)
2. [Add the calendar into the Gantt chart](desktop/working_calendars.md#addingcalendarintogantt)
3. [Assign the calendar to a task/group of tasks](desktop/working_calendars.md#assigningcalendartotasks)


Calendar Configuration Object
--------------------

The calendar configuration object looks as follows:

~~~js
var calendar = {
    id:"calendar1", // optional
    worktime: {
        hours: [8, 17],
        days: [ 0, 1, 1, 1, 1, 1, 0]
    }
}
~~~

It contains the following attributes:

- **id** - (id) optional, the calendar id
- **worktime** - (object) an object that sets the work time in days and hours. It can include:
	- **hours** - (array) an array with global working hours, sets the start and end hours of the task
    - **days** - (array) an array of 7 days of the week (from 0 - Sunday, to 6 - Saturday), where 1/true stands for a working day and 0/false - a non-working day.    

###Setting individual working hours for a day

Instead of the number of a week day, you can also set custom working hours for this day.<br>
For example:  

~~~js
var calendar = {
    id:"calendar1", // optional
    worktime: {
        hours: [8, 17],
        days: [ 0, 1, 1, 1, [12, 17], 1, 0]
    }
}
~~~

where [12,17] - working hours from 12 pm to 17 pm for Thursday.

Creating Working Calendar
--------------------

There are two ways to initialize a working calendar. 

###Using the api/gantt_createcalendar.md method

This method presupposes two possible options:

- when called without parameters, it creates a full-time calendar: 24 working hours per day, 7 days per week 

~~~js
var calendar = gantt.createCalendar();
~~~

- if you have a ready calendar and want to reuse it for making a new one with different options, you can pass your calendar as a parameter 
to the api/gantt_createcalendar.md method

~~~js
var newCalendar = gantt.createCalendar(calendar);
~~~

###Using the api/gantt_addcalendar.md method

This way is fully described in the next section.


Adding Calendar into Gantt
---------------------

After you've created a calendar, you have to add it into Gantt with the help of the api/gantt_addcalendar.md method. Once again, there are two possibilities:

- add an existing calendar configuration 

~~~js
gantt.addCalendar(calendar);
~~~

- set a new [calendar config](desktop/working_calendars.md#calendarconfigurationobject) 

~~~js
gantt.addCalendar({
    id:"custom", // optional
    worktime: {
        hours: [8, 17],
        days: [ 1, 1, 1, 1, 1, 1 ,1]
    }
});
~~~

{{note
You can also use this option for creating a calendar.
}}


Assigning Calendar to Tasks
----------------

Now that your calendar is initialized and added into Gantt, you should assign it to the necessary task or a group of tasks by their common property.

###Assigning a calendar to a task

To assign a working calendar to a task, you need to set the calendar id and the **worktime** object with working days and hours:

~~~js
gantt.addCalendar({
    id:"custom", // optional
    worktime: {
        hours: [8, 17],
        days: [ 1, 1, 1, 1, 1, 1 ,1]
    }
});
~~~

and then set the id of the calendar as a value of the **"calendar_id"** attribute in the task object:

~~~js
{ 
  "id":2, "calendar_id":"custom", "text":"Task #1", "start_date":"02-04-2013", 
  "duration":"8", "parent":"1", "progress":0.5, "open": true
}
~~~

You can modify the name of the task property responsible for binding a calendar to a task via the api/gantt_calendar_property_config.md configuration option:

~~~js
gantt.config.calendar_property = "property_name";
~~~

{{sample 09_worktime/06_task_calendars.html}}

###Assigning a unique calendar to a specific resource

It is also possible to assign a particular working calendar to tasks that require specific resources (people, appliances, etc.). 

For example, you can set individual calendars for tasks, depending on a user a task is assigned to. The order of your actions will be as follows:

- add the desired calendar for each user 

~~~js
var johnCalendarId = gantt.addCalendar({
	worktime: {
		days: [0, 1, 1, 1, 1, 1, 0]
	}
}),

var mikeCalendarId = gantt.addCalendar({
	worktime: {
		days: [1, 0, 0, 0, 0, 0, 1]
	}
}),

var annaCalendarId = gantt.addCalendar({
	worktime: {
		days: [0, 1, 1, 1, 0, 1, 1]
	}
});
~~~

- use the api/gantt_resource_calendars_config.md configuration option to group calendars into one object.
In the example below we add a "user" object and bind calendars to different users inside it:

~~~js
gantt.config.resource_calendars = {
	"user":{
		1 : johnCalendarId,
		2 : mikeCalendarId,
		3 : annaCalendarId
	}
};
~~~

The "user" object includes a set of *key:value* pairs, where key is the number of the user and value corresponds to the 
id of the calendars we have specified at the previous step.

- specify the **user** attribute in task config objects. 
As a value of this attribute, use the key of the necessary calendar from the "user" object defined in the **resource_calendars** configuration option:

~~~js
{ "id":1, user:"1", "text":"Project #2", "start_date":"01-04-2013", "duration":"5" },
{ "id":2, user:"0", "text":"Task #1", "start_date":"02-04-2013", "duration":"2" },
{ "id":3, user:"2", "text":"Task #2", "start_date":"11-04-2013", "duration":"4" },
{ "id":4, user:"3", "text":"Task #3", "start_date":"13-04-2013", "duration":"3" },
{ "id":5, user:"0", "text":"Task #1.1", "start_date":"02-04-2013", "duration":"7" },
{ "id":6, user:"1", "text":"Task #1.2", "start_date":"03-04-2013", "duration":"7" }
~~~

{{sample 09_worktime/07_resource_calendars.html}}


Getting Calendars
-----------------

You can get the objects of working calendars to work with them later on. There are several available options which are described below.

###Getting the global Gantt calendar

To get the object of the global Gantt calendar using the api/gantt_getcalendar.md calendar:

~~~js
var calendar = gantt.getCalendar(id);
~~~

The method takes the id of the global calendar as a parameter, which is "global" by default. The config of a global task calendar is as follows:

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

- working hours are from 08:00 to 17:00.
- working days are from Monday to Friday. 



###Getting the calendar of a task

To get the object of a working calendar assigned to a particular task, apply the api/gantt_gettaskcalendar.md method. You need to pass the task object to the method:

~~~js
var task_calendar = gantt.getTaskCalendar({
    "id":2, 
    "calendar_id":"custom", 
    "text":"Task #1", 
    "start_date":"02-04-2013",
    "parent":"1", 
    "progress":0.5, 
    "open": true
});
~~~

The returned object of the task calendar for the above example is:

~~~js
{
    id:"custom",
    worktime: {
        hours: [8, 17],
        days: [ 1, 1, 1, 1, 1, 1, 1]
    }
}
~~~

{{sample 09_worktime/06_task_calendars.html}}


###Getting all Gantt calendars

To get all the calendars added into Gantt (both the global one and those assigned to separate tasks), make use of the api/gantt_getcalendars.md method:

~~~js
var calendars = gantt.getCalendars();
~~~

The method returns an array of calendars' objects.

Deleting Calendars
-------------------

In case, you don't need a calendar anymore, you can easily remove it via the api/gantt_deletecalendar.md method.
You should pass the calendar id to this method:

~~~js
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
~~~