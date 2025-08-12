calendar
=============

@short:
	the interface of the working calendar object

@type:object

@example:


@template:	api_config
@descr:

Read the desktop/working_time.md#getcalendars article for detailed info on working calendars.

The **calendar** object possesses the following methods and properties:

###Methods


- <span class=submethod>**setWorkTime (config): boolean**</span> - sets the working time for the Gantt chart
    - **_config_** - (*object*) - the [configuration object](api/gantt_setworktime.md#configurationobjectproperties) of a time span:
        - **_day?_** - (*string | number*) - optional, a number of a week day [0 (Sunday) - 6 (Saturday)]. Note, you can set only 1 day at once
        - **_date?_** - (*Date*) - optional, a specific date to set as a working day or day off
        - **_hours?_** - (*string[] | number[] | boolean*) - optional, an array of working hours as 'from'-'to' pairs.'false' value sets a day-off, 'true' (default value) applies the default hours (["8:00-17:00"])
        - **_customWeeks?_** - (*object*) - optional, an object with different working-time rules for different periods of time. The object can contain a set of key:value pairs where key is the name of a time span and value is an object with a list of attributes.
            - **_[timespan: string]_** - (*object*) - the time span with the working time settings. The name of that object is used as the name of the time span
                - **_from_** - (*Date*) - the date when the time span is scheduled to begin
                - **_to_** - (*Date*) - the date when the time span is scheduled to be completed
                - **_hours?_** - (*string[] | number[]*) - optional, an array of working hours as 'from'-'to' pairs.'false' value sets a day-off, 'true' (default value) applies the default hours (["8:00-17:00"])
                - **_days?_** - (*WorkDaysTuple | boolean*) - optional, an array of 7 days of the week (from 0 - Sunday, to 6 - Saturday), where 1/true stands for a working day and 0/false - a non-working day.
    
~~~js
calendar.setWorkTime({ hours:["9:00-18:00"] });
calendar.setWorkTime({ day: 5, hours: ["9:00-18:00"] });
calendar.setWorkTime({ day: 5, hours: false });
calendar.setWorkTime({ date: new Date(2025, 5, 6), hours: ["9:00-18:00"] });
calendar.setWorkTime({ date: new Date(2025, 5, 6), hours: false });
calendar.setWorkTime({ hours: false });
calendar.setWorkTime({
  customWeeks: {
    winter: {
      from: new Date(2025, 11, 1),
      to: new Date(2026, 2, 1),
      hours: ["8:00-13:00", "14:00-16:00"],
      days: [1, 1, 1, 1, 1, 0, 0]
    },
    summer: {
      from: new Date(2026, 5, 1),
      to: new Date(2026, 7, 1),
      hours: ["10:00-13:00", "14:00-16:00"],
      days: [1, 1, 0, 1, 1, 0, 0]
    }
  }
});
calendar.setWorkTime({
  customWeeks: {
    winter: {
      from: new Date(2025, 11, 1),
      to: new Date(2026, 2, 1),
      hours: ["8:00-13:00", "14:00-16:00"],
      days: [1, ["8:00-13:00"], 1, 1, ["14:00-16:00"], 0, 0]
    },
    summer: {
      from: new Date(2026, 5, 1),
      to: new Date(2026, 7, 1),
      hours: ["10:00-13:00", "14:00-16:00"],
      days: false
    }
  }
});
~~~

- <span class=submethod>**unsetWorkTime (config): void**</span> - unsets a working time in the Gantt Chart
    - **_config_** - (*object*) - the [configuration object](api/gantt_unsetworktime.md#configurationobjectproperties) of a time span:
        - **_day?_** - (*string | number*) - optional, a number of a week day [0 (Sunday) - 6 (Saturday)]. Note, you can set only 1 day at once
        - **_date?_** - (*Date*) - optional, a specific date to set as a working day or day off
        - **_hours?_** - (*string[] | number[] | boolean*) - optional, an array of working hours as 'from'-'to' pairs.
'false' value unsets working hours, 'true' (default value) applies the default hours (["8:00-17:00"])


~~~js
calendar.unsetWorkTime({ hours: ["9:00-18:00"] });
calendar.unsetWorkTime({ day: "5", hours: ["9:00-18:00"] });
calendar.unsetWorkTime({ day: 5, hours: false });
calendar.unsetWorkTime({ date: new Date(2025, 5, 6), hours: true });
~~~

- <span class=submethod>**isWorkTime (config, time_unit): boolean**</span> - checks whether the specified date is working 
    - **_config_** - (*Date | object*) - either a date to check or the [configuration object](api/gantt_isworktime.md#configurationobjectproperties) of a time span:
        - **_date_** - (*Date*) - a date to check
        - **_unit?_** - (*string*) - optional, a time unit: "minute", "hour", "day", "week", "month", "year"
        - **_task?_** - (*Task*) - optional, the object of the task the duration of which should be calculated
    - **_time_unit?_** - (*string*) - optional, a time unit: "minute", "hour", "day", "week", "month", "year". Not needed at all when the first parameter is specified as an object

~~~js
var calendar = gantt.getTaskCalendar(task);
if (calendar.isWorkTime({date: date})){
    alert("worktime of task" + task.text);
}

calendar.isWorkTime(new Date(2025, 5, 6));
calendar.isWorkTime(new Date(2025, 5, 6), "hour");
calendar.isWorkTime({ date: new Date(2025, 5, 6), unit: "hour" });
~~~

- <span class=submethod>**getClosestWorkTime (config): Date**</span> - returns the closest working time
    - **_config_** - (*Date | object*) - the [configuration object](api/gantt_getclosestworktime.md#configurationobjectproperties):
        - **_date_** - (*Date*) - a date to get the closest working time for
        - **_dir?_** - (*string*) - optional, specifies the direction of the closest time: "future" or "past" 
        - **_unit?_** - (*string*) - optional, a time unit to search for the closest working time
        - **_task?_** - (*Task*) - optional, the object of the task to use its calendar

~~~js
calendar.getClosestWorkTime(new Date(2025, 5, 6));
calendar.getClosestWorkTime({ 
    date: new Date(2025, 5, 6), 
    unit: "hour", 
    task: gantt.getTask(2), 
    dir: "past" 
});
~~~

- <span class=submethod>**calculateEndDate (config, duration, unit): Date**</span> - calculates the end date of a task
    - **_config_** - (*Date | object*) - either the date when a task is scheduled to begin or the [configuration object](api/gantt_calculateenddate.md#configurationobjectproperties) of a time span:
        - **_start_date_** - (*Date*) - the date when a task is scheduled to begin
        - **_duration_** - (*number*) - the duration of a task
        - **_unit?_** - (*string*) - optional, the time unit of the duration: "minute", "hour", "day", "week", "month", "year"
        - **_task?_** - (*Task*) - optional, the object of the task the duration of which should be calculated
    - **_duration?_** - (*number*) - optional, the duration of a task. Not needed at all when the first parameter is specified as an object
    - **_unit?_** - (*string*) - optional, the time unit of the duration. Not needed at all when the first parameter is specified as an object<br>

~~~js
calendar.calculateEndDate(new Date(2025, 5, 6), 2, "hour");
calendar.calculateEndDate({ 
    start_date: new Date(2025, 5, 6), 
    duration: 2, 
    unit: "hour" 
});
~~~

- <span class=submethod>**calculateDuration (config, end): number**</span> - calculates the duration of a task 
    - **_config_** - (*Date | object*) - either the date when a task is scheduled to begin or the [configuration object](api/gantt_calculateduration.md#configurationobjectproperties) of a time span:
        - **_start_date_** - (*Date*) - the date when a task is scheduled to begin
        - **_end_date_** - (*Date*) - the date when a task is scheduled to be completed
        - **_task?_** - (*Task*) - optional, the object of the task the duration of which should be calculated
    - **_end?_**	- (*Date*) - the date when a task is scheduled to be completed. Not needed at all when the first parameter is specified as an object<br>

~~~js
calendar.calculateDuration(new Date(2025, 5, 6), new Date(2025, 5, 17));
calendar.calculateDuration({ 
    start_date: new Date(2025, 5, 6), 
    end_date: new Date(2025, 5, 17) 
});
~~~

###Properties

- <span class=subproperty>**id**</span> - (*string | number*) - the id of a task's calendar 

@relatedapi:
- api/gantt_addcalendar.md
- api/gantt_getcalendar.md
- api/gantt_createcalendar.md

@related:
desktop/working_time.md#assigningcalendartotask