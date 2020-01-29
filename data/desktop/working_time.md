Work Time Calculation
========================

By default, dhtmlxGantt calculates the duration of tasks in calendar time. It assumes that the final duration of the tasks can include weekends and holidays.

##Enabling Work Time Calculation

To provide calculating tasks' duration in work time, use the api/gantt_work_time_config.md option:

{{snippet
Enabling the mode when tasks' duration is calculated in working time
}}
~~~js
gantt.config.work_time = true; 	// removes non-working time from calculations /*!*/
gantt.config.skip_off_time = true; /*!*/   // hides non-working time in the chart
 
gantt.init("gantt_here");
~~~

Please note that the api/gantt_skip_off_time_config.md config option is available in the PRO version only.

{{sample
09_worktime/02_working_days.html
}}

{{note
Depending on the value of api/gantt_duration_unit_config.md, dhtmlxGantt calculates the tasks' duration in different time units (e.g. if
duration_unit = "hour", the duration is calculated in the working hours). 
}}

<img style="padding-top:25px;" src="desktop/calculating_different_time.png"/>

##Task duration in decimal format

{{pronote This functionality is available in the PRO edition only.}}

Starting from v6.3 dhtmlxGantt allows specifying the duration of tasks in decimal format ("2.5 days", <br>"0.5 hours", "3.75 hours") via the [Duration Formatter](desktop/formatters_ext.md) module.

The important point to remember is that internally Gantt always stores the duration of tasks in integer values.  

Whereas, the provided module allows parsing the duration of tasks from the format entered by the user into the format stored in Gantt (for example, instead of entered "1.5 hours" Gantt will store the number of minutes - `90`). Besides, the stored values can be converted into the readable format (from `12` hours to "0.5 days").

<img src="desktop/decimal_duration.png"/>

{{note The duration of tasks can be represented as a fraction of an hour, day or any other supported by the api/gantt_duration_unit_config.md config unit, except for minutes.}}

###Implementing decimal format

To provide displaying the duration of tasks in decimal format, follow the logic given below:

- set api/gantt_duration_unit_config.md to minute
 
~~~js
gantt.config.work_time = true;
gantt.config.duration_unit = "minute"; /*!*/
~~~

Pay attention that you need to store task durations in a smaller unit than the units of the values displayed in decimal format. To put it simply:<br>
    - if you want a user to be able to specify durations as a fraction of an hour (e.g. "0.5 hours"), you need to set api/gantt_duration_unit_config.md to minute <br>
    - If you want a user to be able to specify durations as a fraction of a day, you need to set api/gantt_duration_unit_config.md to hour. In this case, users will be able to enter the duration of the task as "0.5 day", but "0.5 hour" will be rounded up to 1 hour, since the duration will be stored in integer hours.

{{note By default, task dates are snapped to the time scale. If you have a time scale in days, you may want to disable it in order to be able to drag and drop a task to different hours within a day. <br>To enable this drag and drop, you need to disable api/gantt_round_dnd_dates_config.md and set an appropriate value to api/gantt_time_step_config.md.}}
For example:

~~~js
// global time step is 15 minutes, requires "minute" as duration units
gantt.config.time_step = 15;
gantt.config.round_dnd_dates = false;
~~~

or 

~~~js
// global time step is one hour, 
// such value can be used when duration unit is set to "hour"
gantt.config.time_step = 60;
gantt.config.round_dnd_dates = false;
~~~

- create the *formatter* object for formatting the duration of tasks:

~~~js
// formatting the duration
var formatter = gantt.ext.formatters.durationFormatter({
    enter: "day", 
    store: "minute", // duration_unit
    format: "day",
    hoursPerDay: 8,
    hoursPerWeek: 40,
    daysPerMonth: 30
});
~~~

- add the *formatter* object to the "Duration" column by defining the template function, that will return the *formatted duration of the task*, via the **template** attribute of the columns parameter:

~~~js
gantt.config.columns = [
	{name: "text", tree: true, width: 170, resize: true, editor: textEditor},
	{name: "start_date", align: "center", resize: true, editor: dateEditor},
	{name: "duration", label:"Duration", resize: true, align: "center", 
        template: function(task) { /*!*/
		    return formatter.format(task.duration); /*!*/
	    }, width: 100},
	{name: "add", width: 44}
];
~~~

- add the *formatter* object to the lightbox section by setting the **formatter** property for the **time** control

~~~js
gantt.config.lightbox.sections = [
	{name: "description", height: 70, map_to: "text", type: "textarea", focus: true},
	{name: "time", type: "duration", map_to: "auto", formatter: formatter}
];
~~~

- in case inline editing in Grid is enabled, you also need to add  the *formatter* object to the durationEditor object via the **formatter** attribute:

~~~js
var durationEditor = {
    type: "duration", 
    map_to: "duration", 
    formatter: formatter, /*!*/
    min:0, max:1000
    };
gantt.config.columns = [
	{name: "text", tree: true, width: 170, resize: true},
	{name: "start_date", align: "center", resize: true},
	{name: "duration", label:"Duration", resize: true, align: "center", 
        template: function(task) {
		    return formatter.format(task.duration);
	}, editor: durationEditor, width: 100}, /*!*/
	{name: "add", width: 44}
];
~~~

{{note If you already have Gantt with the duration of tasks stored in minutes, hours or any other unit, you can also use the [Duration Formatter](desktop/formatters_ext.md) module to present the durations in decimal format. }}

##Global Settings

<h3 id="setworktime">Setting the working time</h3>


The default working time is the following:

- Working days:  Monday - Friday.
- Working hours: 08:00 - 17:00.

(*hours configuration is taken into account only when api/gantt_duration_unit_config.md is less than a day (hours or minutes)*).


To change the default working time, use the api/gantt_setworktime.md method:

{{snippet
Setting a custom working time
}}
~~~js
//changes the working time of working days
gantt.setWorkTime({ hours:[9,18] });

//makes all Fridays days-off
gantt.setWorkTime({ day:5, hours:false });

//changes the working time for Fridays and Saturdays
gantt.setWorkTime({day : 5, hours : [8,12]});
gantt.setWorkTime({day : 6, hours : [8,12]});

//makes a specific date a working day 
gantt.setWorkTime({date : new Date(2019, 2, 31)});

//makes a specific date a day-off
gantt.setWorkTime({date:new Date(2019,0,1), hours:false})
~~~

{{sample
09_worktime/04_custom_workday_duration.html
}}

Note, each next call of the method for the same date will re-write the previous working-time rule. So, if you need to unset some rule, call the api/gantt_setworktime.md method with other configuration: 

~~~js
gantt.setWorkTime({hours:[8,12]});
gantt.setWorkTime({hours:[13,17]});
//the result of following commands will be the working time 13:00-17:00
//and not a mixin of both commands
~~~

<h3 id="unsetworktime">Unsetting the working time</h3>

You can unset a working time by using the api/gantt_unsetworktime.md method:

~~~js
//changes the working time of working days from [8,17] to [8,12]
gantt.setWorkTime({hours:[8,12]});
//unsets the working time
gantt.unsetWorkTime({hours:[8,12]});
~~~


<h3 id="checkworktime">Checking the working time</h3>

To check whether the specified date is working time, use the api/gantt_isworktime.md method:

~~~js
//makes 1 January, 2019 a day off
gantt.setWorkTime({date:new Date(2019,0,1), hours:false});
gantt.isWorkTime(new Date(2019,0,1)) // -> false  /*!*/

// makes 15 March, 2019 a working day from 9:00 till 18:00 
gantt.setWorkTime({date : new Date(2019, 2, 15), hours:[9,18]});
gantt.isWorkTime(new Date(2019, 2, 15,10,0), "hour"); // -> true  /*!*/
gantt.isWorkTime(new Date(2019, 2, 15,8,0), "hour"); // ->false  /*!*/
~~~
{{sample
09_worktime/05_adjust_to_worktime.html
}}


<h3 id="getworktime">Getting the working time</h3>

To get the working hours of the specified date, use the api/gantt_getworkhours.md method:

~~~js
gantt.getWorkHours(new Date(2019,3,30))// -> [8, 17]
~~~


To get the closest working day to the specified date, use the api/gantt_getclosestworktime.md method:

~~~js
gantt.getClosestWorkTime(new Date(2019,3,30)); 
~~~


<h3 id="color_dayoff_times">Coloring the day-off times</h3>

To color the day-off times in the chart area, use the api/gantt_timeline_cell_class_template.md template:

~~~js
gantt.templates.timeline_cell_class = function(task, date){
	if(!gantt.isWorkTime({task:task, date: date}))
		return "week_end";
	return "";
};
~~~
{{sample
09_worktime/04_custom_workday_duration.html
}}



Learn more in the desktop/highlighting_time_slots.md article.

{{note
To hide the day-off time, use the technique described in the article - desktop/custom_scale.md.
}}


##Multiple Work Time Calendars

In addition to global working time settings, Gantt allows creating multiple work time calendars. You can assign them to individual tasks or groups of tasks.


<h3 id="createcalendar">Creating a working calendar</h3>

A new calendar instance can be created using the api/gantt_createcalendar.md method.

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

The calendar object is initially detached from Gantt and won't take any effect until you add it into Gantt.


<h3 id="addcalendar">Adding a working calendar into Gantt</h3>


After you've created a calendar, you have to add it into Gantt with the help of the api/gantt_addcalendar.md method. Once again, there are two possibilities:

- add an existing calendar configuration 

~~~js
var calendarId = gantt.addCalendar(calendar);
~~~

- set a new calendar config, which includes the calendar id and the **worktime** object with working days and hours:

~~~js
var calendarId = gantt.addCalendar({
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


<h3 id="getcalendars">Getting Calendars</h3>


You can get the objects of working calendars to work with them later on. There are several available options which are described below.

<h4 id="getglobalcalendar">Getting the global Gantt calendar</h4>

To get the object of the global Gantt calendar using the api/gantt_getcalendar.md calendar:

~~~js
var calendar = gantt.getCalendar(id);
~~~

The *calendar* object is an instance of the api/gantt_calendar_other.md interface.

The default calendar instance (global settings) can be accessed by the predefined **"global"** id:

~~~js
var globalSettings = gantt.getCalendar("global");
~~~

This calendar is used by the [work time methods](desktop/working_time.md#globalsettings), when there is no other calendar specified. It is assigned to tasks by default.


<h4 id="gettaskcalendar">Getting the current calendar of a task</h4>

To get the object of a working calendar assigned to a particular task, apply the api/gantt_gettaskcalendar.md method. You need to pass the task object to the method:

~~~js
var task = gantt.getTask(taskId);

var calendar = gantt.getTaskCalendar(task);

if(calendar.isWorkTime(date)){
    alert("TaskWorkTime");
}
~~~

{{sample 09_worktime/06_task_calendars.html}}

If work time is disabled in the gantt config, the method will return a 24/7 work time calendar.


<h3 id="globalmethodsforcalendars">Using global methods to access calendars</h3>

The [work time methods](desktop/working_time.md#globalsettings) of the Gantt object can be used to calculate the time duration of a specific task, without accessing its calendar manually. 

In that case methods take an object argument where the related "task" object is passed as one of the properties.


- [**gantt.isWorkTime**](api/gantt_isworktime.md)

~~~js
if (gantt.isWorkTime({date: date, task: task})){
    alert("work time of a task" + task.text);
}
~~~

Which is equal to:

~~~js
var calendar = gantt.getTaskCalendar(task);
if (calendar.isWorkTime({date: date})){
    alert("work time of a task" + task.text);
}
~~~

- [**gantt.calculateEndDate**](api/gantt_calculateenddate.md)

~~~js
var end_date = gantt.calculateEndDate({start_date:date, duration:duration, task:task});

// or
var end_date = gantt.calculateEndDate(task);
~~~

- [**gantt.calculateDuration**](api/gantt_calculateduration.md)

~~~js
var duration = gantt.calculateDuration({start_date:start, end_date:end, task:task});

// or
var duration = gantt.calculateDuration(task);
~~~

- [**gantt.getClosestWorkTime**](api/gantt_getclosestworktime.md)

~~~js
var closestTime = gantt.getClosestWorkTime({date: date, task:task});
~~~


<h3 id="getallcalendars">Getting all Gantt calendars</h3>

To get all the calendars added into Gantt (both the global one and those assigned to separate tasks), make use of the api/gantt_getcalendars.md method:

~~~js
var calendars = gantt.getCalendars();
~~~

The method returns an array of [Calendar interface](api/gantt_calendar_other.md) objects.

<h3 id="deletecalendar">Deleting calendars</h3>


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

##Assigning Calendar to Task

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
  "id":2, "calendar_id":"custom", "text":"Task #1", "start_date":"02-04-2019", 
  "duration":"8", "parent":"1", "progress":0.5, "open": true
}
~~~

You can modify the name of the task property responsible for binding a calendar to a task via the api/gantt_calendar_property_config.md configuration option:

~~~js
gantt.config.calendar_property = "property_name";
~~~

{{sample 09_worktime/06_task_calendars.html}}


##Assigning Calendar to Resource

{{pronote This functionality is available in the PRO edition only.}}

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
{ "id":1, "user":"1", "text":"Project #2", "start_date":"01-04-2019", "duration":"5" },
{ "id":2, "user":"0", "text":"Task #1", "start_date":"02-04-2019", "duration":"2" },
{ "id":3, "user":"2", "text":"Task #2", "start_date":"11-04-2019", "duration":"4" },
{ "id":4, "user":"3", "text":"Task #3", "start_date":"13-04-2019", "duration":"3" },
{ "id":5, "user":"0", "text":"Task #1.1", "start_date":"02-04-2019", "duration":"7" },
{ "id":6, "user":"1", "text":"Task #1.2", "start_date":"03-04-2019", "duration":"7" }
~~~

{{sample 09_worktime/07_resource_calendars.html}}

{{note Note that when a task has both a custom and a resource calendars, the custom calendar has a higher priority and overrides the resource calendar settings.}}


## Assigning Calendar to Project

{{pronote This functionality is available in the PRO edition only.}}

There is a possibility to specify a working calendar not only for a particular task or resource, but for a project, so that tasks could inherit the same calendar that their parent project is assigned to.

The logic of inheriting a calendar by a task is the following:

- If a user assigns a calendar to a subproject with tasks, all its tasks will use this calendar. 
- If a task has a personal calendar assigned to it, it will use its calendar and not the calendar of its parent project.

To enable this functionality, you need to set the api/gantt_inherit_calendar_config.md configuration option to *true*. By default this option is disabled.

~~~js
gantt.config.inherit_calendar = true;
~~~

- If *true*, tasks that have no calendar assigned to them, will use the calendar assigned to their summary parent (which can get a calendar from its parent in its turn).
- If *false*, tasks that have no calendar assigned to them, will use the global calendar.

In the example below tasks inherit calendars from their parent projects by default. In case a task has a different calendar assigned, this calendar will be used instead. Thus, tasks #2.2 and #3 use the "Full week" 
calendars unlike their parent projects:

![Working calendar for project](desktop/working_calendar_project.png)

{{sample 09_worktime/08_project_calendars.html}}


##Changing Calendar Dynamically

Gantt won't pick up the change of a task calendar automatically, so the task schedule should be updated manually when its calendar changes:

For example, a calendar can be changed from lightbox:

~~~js
function updateTaskTiming(task) {
  task.start_date = gantt.getClosestWorkTime({
     dir: "future",
     date: task.start_date,
     unit: gantt.config.duration_unit,
     task: task
  });
  task.end_date = gantt.calculateEndDate(task);
}

gantt.attachEvent("onLightboxSave", function(id, task, is_new){
  updateTaskTiming(task);
  return true;
});
~~~

Or, you can define recalculation of all tasks on demand:

~~~js
gantt.batchUpdate(function(){
  gantt.eachTask(function(task){
    task.start_date = gantt.getClosestWorkTime({
      dir: "future",
      date: task.start_date,
      unit: gantt.config.duration_unit,
      task: task
    });
    task.end_date = gantt.calculateEndDate(task);
    gantt.updateTask(task.id);
  });
});
~~~

