---
sidebar_label: roundDate
title: roundDate method
description: "rounds the specified date to the nearest date in the time scale"
---

# roundDate

### Description

@short: Rounds the specified date to the nearest date in the time scale

@signature: roundDate: (date: Date | RoundDateConfig) =\> Date

### Parameters

- `date` - (required) *Date | RoundDateConfig* -     the Date object to round or an object with settings

### Returns
- ` date` - (Date) - the rounded Date object

### Example

~~~jsx
var today = gantt.roundDate(new Date());
~~~

### Details

If the specified date should be rounded to the nearest date, pass the Date object as a parameter to the method:

~~~js
var today = gantt.roundDate(new Date());
console.log(today);
~~~

If the specified date should be rounded to the nearest date considering the unit of time, pass an object with settings to the **roundDate()** method. The object can take the following attributes:

- **date** - (*Date*) - the Date object to round;
- **unit?** - (*string*) - the time unit ("minute", "hour", "day", "week", "month", "year");
- **step?** - (*number*) - the step of the time scale (X-Axis), 1 by default.


~~~js
var today = gantt.roundDate({
    date: new Date(),
    unit: "hour",
    step: 1   
});
console.log(today);
~~~

### Related API
- [roundTaskDates](api/method/roundtaskdates.md)

