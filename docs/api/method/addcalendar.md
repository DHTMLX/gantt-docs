---
sidebar_label: addCalendar
title: addCalendar method
description: "adds a calendar into Gantt"
---

# addCalendar

### Description

@short: Adds a calendar into Gantt

@signature: addCalendar: (calendar: CalendarConfig) =\> string

### Parameters

- `calendar` - (required) *CalendarConfig* - an object with configuration of the calendar

### Returns
- ` calendarId` - (string) - the id of the calendar

### Example

~~~jsx
// adding a previously created calendar
const calendarId = gantt.addCalendar(calendar);

// adding a calendar with a new config (the "days" property is set as array)
const calendarId = gantt.addCalendar({
    id: "custom", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1]
    }
});

// adding a calendar with a new config (the "days" property is set as object)
const calendarId = gantt.addCalendar({
    id: "global", // the calendar id is optional
    worktime: {
      hours: ["8:00-12:00", "13:00-17:00"], // global work hours for weekdays
      days: {
        weekdays: [0, 1, 1, 1, 1, 1, 0],
        dates: {
          "2025-04-06": true,  // override work hours for a specific date
          "2025-04-08": false,
          "2025-04-09":  ["9:00-15:00"]
        }
      },
      customWeeks: {
        lastMonthOfTheYear: {
          from: new Date(2025, 11, 1),
          to: new Date(2026, 0, 1),
          hours: ["9:00-13:00"],
          days: {
            weekdays: [0, 1, 1, 1, 1, 0, 0],
            dates: {
              "2025-12-08": true,
              "2025-12-09":  false,
              "2025-12-10":  ["9:00-15:00"]
            }
          }
        }
      }
    }
});

const calendar = gantt.getCalendar(calendarId);
~~~

### Related samples
- [Task level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/06_task_calendars.html)
- [Resource level calendars](https://docs.dhtmlx.com/gantt/samples/09_worktime/07_resource_calendars.html)
- [Different worktimes for different time periods](https://docs.dhtmlx.com/gantt/samples/09_worktime/12_calendar_ranges.html)

### Details

The calendar configuration object can contain the following attributes:

- **id?** - (*string | number*) - optional, the calendar id
- **worktime?** - (*object*) - an object that sets the worktime in days and hours. It can include:
- **_hours?_** - (*string[] | number[] | boolean*) - optional, an array with global working hours, sets the start and end hours of the task
- **_days?_** - (*WorkDaysTuple* | *object*) - optional, it can be:
    -  either an array of 7 days of the week (from 0 - Sunday, to 6 - Saturday), where 1/true stands for a working day and 0/false - a non-working day
    - or an object that contains weekdays and dates. It can include:
        - **_weekdays?_** - (*WorkDaysTuple*) optional, an array of 7 days of the week (from 0 - Sunday, to 6 - Saturday), where 1/true stands for a working day and 0/false - a non-working day
        - **_dates?_** - (*object*) optional, an object with working time settings for specified dates. The object can contain a number of key: value pairs where:
            - key is a date set as a string 
            - value is either an array of working hours as 'from'-'to' pairs or a boolean ('false' value sets a day-off, 'true' applies the default hours (["8:00-17:00"]))
- **_customWeeks?_** - (*object*) - optional, an object with different working-time rules for different periods of time. The object can contain a set of key:value pairs where key is the name of a time span and value is an object with a list of attributes.
    - **_[timespan: string]_** - (*object*) - the time span with the working time settings. The name of that object is used as the name of the time span
        - **_from_** - (*Date*) - the date when the time span is scheduled to begin
        - **_to_** - (*Date*) - the date when the time span is scheduled to be completed
        - **_hours?_** - (*Array&lt;string | number&gt;*) - optional, an array of working hours as 'from'-'to' pairs.'false' value sets a day-off, 'true' (default value) applies the default hours (["8:00-17:00"])
        - **_days?_** - (*WorkDaysTuple* | *object*) - optional, it can be:
            -  either an array of 7 days of the week (from 0 - Sunday, to 6 - Saturday), where 1/true stands for a working day and 0/false - a non-working day
            - or an object that contains weekdays and dates. It can include:
                - **_weekdays?_** - (*WorkDaysTuple*) optional, an array of 7 days of the week (from 0 - Sunday, to 6 - Saturday), where 1/true stands for a working day and 0/false - a non-working day
                - **_dates?_** - (*object*) optional, an object with working time settings for specified dates. The object can contain a number of key: value pairs where:
                    - key is a date set as a string 
                    - value is either an array of working hours as 'from'-'to' pairs or a boolean ('false' value sets a day-off, 'true' applies the default hours (["8:00-17:00"]))


### Setting individual working hours for a day

Instead of the number of a week day, you can also set custom working hours for this day.
For example: 

~~~js
const calendar = {
    id: "calendar1", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: [0, 1, 1, 1, ["12:00-17:00"], 1, 0]
    }
}
~~~

where ["12:00-17:00"] are working hours from 12 pm to 17 pm for Thursday.

### Setting worktime for different time intervals

There is the ability to configure different working time rules for different periods of time by using the **customWeeks** attribute:

~~~js
gantt.addCalendar({
    id: "global", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: [1, 1, 1, 1, 1, 1, 1],
        customWeeks: {
            winter: {
                from: new Date(2025, 11, 1), // December 1st, 2025
                to: new Date(2026, 2, 1), // March 1st, 00:00, 2026
                hours: ["9:00-13:00", "14:00-16:00"],
                days: [1, 1, 1, 1, 0, 0, 0]
            }
        }
    }
});
~~~

### Setting worktime for certain dates

You can also specify working hours for certain dates by setting them in the **_dates_** property of the **_days_** object (both for the **worktime** attribute and the **customWeeks** property). For example:  

~~~js
const calendar = {
    id: "calendar1", // optional
    worktime: {
        hours: ["8:00-17:00"],
        days: { 
        	dates: { 
          		"2025-04-09":  ["9:00-15:00"] 
        	} 
    	},
        customWeeks: {
            winter: {
                from: new Date(2025, 11, 1), // December 1st, 2025
                to: new Date(2026, 2, 1), // March 1st, 00:00, 2026
                hours: ["9:00-13:00", "14:00-16:00"],
                days: { 
                    dates: { 
                        "2026-01-02":  ["9:00-15:00"] 
                    } 
                }
            }
        }
    }
}
~~~

### Related API
- [getCalendar](api/method/getcalendar.md)
- [createCalendar](api/method/createcalendar.md)
- [deleteCalendar](api/method/deletecalendar.md)
- [calendar](api/other/calendar.md)

### Related Guides
- [Work Time Calculation](guides/working-time.md#multipleworktimecalendars)

### Change log
- the possibility to specify the **_days_** property as *object* with weekdays and dates is added in v9.1
- the **customWeeks** property is added in v7.1;
- added in version 4.2

