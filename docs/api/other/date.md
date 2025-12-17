---
sidebar_label: date
title: date formatting methods
description: "A set of date formatting methods"
---

# date

### Description

@short: A set of date formatting methods 

@signature: date: DateHelpers


### Methods

#### add(date, number, unit)
Adds/subtracts the specified time interval to/from the date

**Parameters**:
- `date` - (Date) - The date object
- `number` - (number) - Number of units to add (positive) or subtract (negative)
- `unit` - (string) - Time unit: 'minute', 'hour', 'day', 'week', 'month', 'year'

**Returns**: Date - The new date object

**Example**:
~~~js
// adds 1 year to the specified date: 29 June, 2019 -> 29 June, 2020
var newDate = gantt.date.add(new Date(2019, 05, 29), 1, 'year');
~~~

---

#### add_quarter(date, number)
Adds/subtracts the specified number of quarters to/from the date

**Parameters**:
- `date` - (Date) - The date object
- `number` - (number) - Number of quarters to add (positive) or subtract (negative)

**Returns**: Date - The new date object

**Example**:
~~~js
// adds 1 quarter (3 months) to the specified date: 
// 29 June, 2019 -> 29 September, 2020
var newDate = gantt.date.add_quarter(new Date(2019, 05, 29), 1);
~~~

---

#### convert_to_utc(date)
Converts local time to UTC

**Parameters**:
- `date` - (Date) - The date object to convert

**Returns**: Date - The UTC date object

**Example**:
~~~js
// 29 June, 2019 14:00 (local time) -> 29 June, 2019 12:00 (utc)
var time = gantt.date.convert_to_utc(new Date(2019, 05, 29, 14, 00));
~~~

---

#### copy(date)
Makes a copy of a Date object

**Parameters**:
- `date` - (Date) - The date object to copy

**Returns**: Date - The copied date object

**Example**:
~~~js
var copy = gantt.date.copy(new Date(2019, 05, 29)); // -> 29 June, 2019
~~~

---

#### date_part(date)
Resets the time part of the provided date to 00:00:00

**Parameters**:
- `date` - (Date) - The date object to format

**Returns**: Date - The date with time reset to 00:00:00

**Example**:
~~~js
// 29 June, 2019 14:30:10 -> 29 June, 2019 00:00:00
var date = gantt.date.date_part(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### date_to_str(format, utc)
Returns a function that converts a Date object to a string of the specified format

**Parameters**:
- `format` - (string) - The date format (see guides/date-format.md)
- `utc` - (boolean, optional) - Whether to convert to UTC

**Returns**: Function - The formatting function

**Example**:
~~~js
var formatFunc = gantt.date.date_to_str("%d/%m/%Y");
var date = formatFunc(new Date(2019, 05, 29)); // -> "29/06/2019"
~~~

---

#### day_start(date)
Resets the time part of the provided date to 00:00:00 (alias of date_part)

**Parameters**:
- `date` - (Date) - The date object to format

**Returns**: Date - The date with time reset to 00:00:00

**Example**:
~~~js
// 29 June, 2019 14:30:10 -> 29 June, 2019 00:00:00
var date = gantt.date.day_start(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### getISOWeek(date)
Returns the ISO-8601 week number of the date (weeks start on Monday)

**Parameters**:
- `date` - (Date) - The date object

**Returns**: number - The week number

**Example**:
~~~js
var week = gantt.date.getISOWeek(new Date(2019, 05, 29)); // ->26
~~~

---

#### getUTCISOWeek(date)
Returns the week number of the date after converting to UTC

**Parameters**:
- `date` - (Date) - The date object

**Returns**: number - The week number

**Example**:
~~~js
var week = gantt.date.getUTCISOWeek(new Date(2019, 05, 29)); // ->26
~~~

---

#### getWeek(date)
Returns the week number of the date (week start depends on gantt.config.start_on_monday)

**Parameters**:
- `date` - (Date) - The date object

**Returns**: number - The week number

**Example**:
~~~js
// weeks start on Sunday
gantt.config.start_on_monday = false;

var isoWeek = gantt.date.getISOWeek(new Date(2019, 2, 25)); // ->12
var week = gantt.date.getWeek(new Date(2019, 2, 25)); // ->13
~~~

---

#### month_start(date)
Returns the first day of the month with time reset to 00:00:00

**Parameters**:
- `date` - (Date) - The date object

**Returns**: Date - The first day of month

**Example**:
~~~js
// 29 June, 2019 14:30 -> 01 June, 2019 00:00
var firstDay = gantt.date.month_start(new Date(2019, 05, 29, 14, 30));
~~~

---

#### parseDate(date, format)
Converts a string of the specified format to a Date object

**Parameters**:
- `date` - (string) - The date string
- `format` - (string) - The date format (see guides/date-format.md)

**Returns**: Date - The parsed date object

**Example**:
~~~js
var date = gantt.date.parseDate("29/06/2019","%d/%m/%Y"); //-> 29 June, 2019 00:00:00
~~~

---

#### str_to_date(format, utc)
Returns a function that converts a string to a Date object

**Parameters**:
- `format` - (string) - The date format (see guides/date-format.md)
- `utc` - (boolean, optional) - Whether to convert to UTC

**Returns**: Function - The parsing function

**Example**:
~~~js
var formatFunc = gantt.date.str_to_date("%d/%m/%Y");
var date = formatFunc("29/06/2019"); // -> 29 June, 2019 00:00:00
~~~

---

#### time_part(date)
Returns the time as seconds since midnight

**Parameters**:
- `date` - (Date) - The date object

**Returns**: number - Seconds since midnight

**Example**:
~~~js
var time = gantt.date.time_part(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### to_fixed(num)
Adds leading zero to numbers < 10

**Parameters**:
- `num` - (number) - The number to format

**Returns**: string - The formatted string

**Example**:
~~~js
var num1 = gantt.date.to_fixed(2); // ->"02"
var num2 = gantt.date.to_fixed(10); // ->10
~~~

---

#### minute_start(date)
Resets seconds to 00

**Parameters**:
- `date` - (Date) - The date object

**Returns**: Date - The formatted date

**Example**:
~~~js
// 29 June, 2019 14:30:10 -> 29 June, 2019 14:30:00
var date = gantt.date.minute_start(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### hour_start(date)
Resets minutes and seconds to 00

**Parameters**:
- `date` - (Date) - The date object

**Returns**: Date - The formatted date

**Example**:
~~~js
// 29 June, 2019 14:30:10 -> 29 June, 2019 14:00:00
var date = gantt.date.hour_start(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### week_start(date)
Returns the first day of the week with time reset to 00:00:00

**Parameters**:
- `date` - (Date) - The date object

**Returns**: Date - The first day of week

**Example**:
~~~js
// 29 June, 2019 14:30 -> 24 June, 2019 00:00
var weekStart = gantt.date.week_start(new Date(2019, 05, 29, 14, 30));
~~~

---

#### quarter_start(date)
Returns the first month of the quarter with time reset to 00:00:00

**Parameters**:
- `date` - (Date) - The date object

**Returns**: Date - The first day of quarter

**Example**:
~~~js
// 29 June, 2019 14:30:10 -> 01 April, 2019 00:00:00
var date = gantt.date.quarter_start(new Date(2019, 05, 29, 14, 30, 10));
~~~

---

#### year_start(date)
Returns the first day of the year with time reset to 00:00:00

**Parameters**:
- `date` - (Date) - The date object

**Returns**: Date - The first day of year

**Example**:
~~~js
// 29 June, 2019 14:30 -> 01 January, 2019 00:00
var yearStart = gantt.date.year_start(new Date(2019, 05, 29, 14, 30));
~~~
