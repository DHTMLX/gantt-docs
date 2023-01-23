date
=============

@short: a set of date formatting methods
	

@type:object

@example:

@template:	api_config
@descr:
The **date** object provides the following methods:

<ul>
	<li>
    	<b class=submethod>add (date, number, unit): Date</b> - adds/subtracts the specified time interval to/from the date
        <ul>
          	<li><b><i>date</i></b> - (<i>Date</i>) the date object that you need to add a time to/subtract a time from </li>
            <li><b><i>number</i></b> - (<i>number</i>) the number of units to add. If this number is positive - the time will be added to the date, if negative - the time will be subtracted </li>
            <li><b><i>unit</i></b> - (<i>string</i>)  the time unit. Values: 'minute', 'hour', 'day', 'week', 'month', 'year'. </li>
~~~js
//adds 1 year to the specified date: 29 June, 2019 -> 29 June, 2020
var newDate = gantt.date.add(new Date(2019, 05, 29), 1, 'year');
~~~
        </ul>
    </li>
    <li>
    	<b class=submethod>add_quarter (date, number): Date</b> - adds/subtracts the specified number of quarters to/from the date
        <ul>
          	<li><b><i>date</i></b> - (<i>Date</i>) the date object that you need to add quarters to/subtract quarters from </li>
            <li><b><i>number</i></b> - (<i>number</i>) the number of quarters (1 quarter = 3 months) to add. If this number is positive - the quarters will be added to the date, if negative - the quarters will be subtracted </li>          
~~~js
//adds 1 quarter (3 months) to the specified date: 
//29 June, 2019 -> 29 September, 2020
var newDate = gantt.date.add_quarter(new Date(2019, 05, 29), 1);
~~~
        </ul>
    </li>
    <li>
    	<b class=submethod>convert_to_utc (date): Date</b> - converts local time to UTC
        <ul>
          	<li><b><i>date</i></b> - (<i>Date</i>) the date object to convert </li>
~~~js
//29 June, 2019 14:00 (local time) -> 29 June, 2019 12:00 (utc)
var time = gantt.date.convert_to_utc(new Date(2019, 05, 29, 14, 00));
~~~
        </ul>
    </li>
    <li>
    	<b class=submethod>copy (date): Date</b> - makes a copy of a Date object
        <ul>
          	<li><b><i>date</i></b> - (<i>Date</i>) the date object to copy </li>
~~~js
var copy = gantt.date.copy(new Date(2019, 05, 29));// -> 29 June, 2019
~~~
        </ul>
    </li>
    <li>
    	<b class=submethod>date_part (date): Date</b> - resets the time part of the provided date to 00:00:00
        <ul>
          	<li><b><i>date</i></b> - (<i>Date</i>) the date object to format </li>
~~~js
//29 June, 2019 14:30:10 -> 29 June, 2019 00:00:00
var date = gantt.date.date_part(new Date(2019, 05, 29, 14, 30, 10));
~~~
        </ul>
    </li>
    <li>
    	<b class=submethod>date_to_str (format, utc): string</b> - returns a function that converts a Date object to a string of the specified format
        <ul>
          	<li><b><i>format</i></b> - (<i>string</i>) the date format ( see desktop/date_format.md)  </li>
          	<li><b><i>utc</i></b> - (<i>boolean</i>) specifies whether local time should be converted to UTC  </li>
~~~js
var formatFunc = gantt.date.date_to_str("%d/%m/%Y");
var date = formatFunc(new Date(2019, 05, 29)); // -> "29/06/2019"
~~~
        </ul>
    </li>
    <li>
    	<b class=submethod>day_start (date): Date</b> - resets the time part of the provided date to 00:00:00. Alias of the <b>date_part</b> method. Used by the Day view to set the display date and can be redefined to provide the default behaviour
        <ul>
          	<li><b><i>date</i></b> - (<i>Date</i>) the date object to format </li>
~~~js
//29 June, 2019 14:30:10 -> 29 June, 2019 00:00:00
var date = gantt.date.day_start(new Date(2019, 05, 29, 14, 30, 10));
~~~
        </ul>
    </li>
    <li>
    	<b class=submethod>getISOWeek (date): number</b> - returns the ISO-8601 week number of the date, weeks starts on Monday
        <ul>
          	<li><b><i>date</i></b> - (<i>Date</i>) the date object to format </li>
~~~js
var week = gantt.date.getISOWeek(new Date(2019, 05, 29));// ->26
~~~
        </ul>
    </li>
    <li>
    	<b class=submethod>getUTCISOWeek (date): number</b> - returns the week number of the date, but previously converts local time to UTC
        <ul>
          	<li><b><i>date</i></b> - (<i>Date</i>) the date object to format </li>
~~~js
var week = gantt.date.getUTCISOWeek(new Date(2019, 05, 29));// ->26
~~~
        </ul>
    </li>
    <li>
    	<b class=submethod>getWeek (date): number</b> - returns the week number of the date. Weeks start either on Monday or Sunday, depending on the value of the api/gantt_start_on_monday_config.md property.
        <ul>
          	<li><b><i>date</i></b> - (<i>Date</i>) the date object to format </li>
~~~js
// weeks start on Sunday
gantt.config.start_on_monday = false;

var isoWeek = gantt.date.getISOWeek(new Date(2019, 2, 25)); // ->12
var week = gantt.date.getWeek(new Date(2019, 2, 25)); // ->13
~~~
        </ul>
    </li>
    <li>
    	<b class=submethod>month_start (date): Date</b> - returns a Date object of the first day of the month for the specified date and clears the time part to zero
        <ul>
          	<li><b><i>date</i></b> - (<i>Date</i>) the date object to format </li>
~~~js
//29 June, 2019 14:30 -> 01 June, 2019 00:00
var firstDay = gantt.date.month_start(new Date(2019, 05, 29, 14, 30));
~~~
        </ul>
    </li>
    <li>
    	<b class=submethod>parseDate (date, format): Date</b> - converts a string of the specified format to a Date object 
        <ul>
        	<li><b><i>date</i></b> - (<i>string</i>) a date as a string </li>
            <li><b><i>format</i></b> - (<i>string</i>) the date format ( see desktop/date_format.md)  </li>
~~~js
var date = gantt.date.parseDate("29/06/2019","%d/%m/%Y");//-> 29 June, 2019 00:00:00
~~~
		</ul>
    </li>
    <li>
    	<b class=submethod>str_to_date (format, utc): Date</b> - returns a function that converts a string of the specified format to a Date object
        <ul>
          	<li><b><i>format</i></b> - (<i>string</i>) the date format ( see desktop/date_format.md)  </li>
          	<li><b><i>utc</i></b> - (<i>boolean</i>) specifies whether local time should be converted to UTC  </li>
~~~js
var formatFunc = gantt.date.str_to_date("%d/%m/%Y");
var date = formatFunc("29/06/2019"); // -> 29 June, 2019 00:00:00
~~~
        </ul>
    </li>
    <li>
    	<b class=submethod>time_part (date): number</b> - returns the time of a Date object as a number of seconds counted from the midnight (00:00:00)
        <ul>
          	<li><b><i>date</i></b> - (<i>Date</i>) the date object to format </li>
~~~js
var time = gantt.date.time_part(new Date(2019, 05, 29, 14, 30, 10));
~~~
        </ul>
    </li>
    <li>
    	<b class=submethod>to_fixed (num): string</b> - adds the leading zero to numbers less than 10 and returns the result as a string. Doesn't affect numbers from 10
        <ul>
          	<li><b><i>num</i></b> - (<i>number</i>) the number to format </li>
~~~js
var num1 = gantt.date.to_fixed(2);// ->"02"
var num2 = gantt.date.to_fixed(10);// ->10
~~~
        </ul>
    </li>
     <li>
    	<b class=submethod>minute_start (date): Date</b> - returns a Date object of the specified date and clears the part with seconds to zero
        <ul>
          	<li><b><i>date</i></b> - (<i>Date</i>) the date object to format </li>
~~~js
//29 June, 2019 14:30:10 -> 29 June, 2019 14:30:00
var date = gantt.date.minute_start(new Date(2019, 05, 29, 14, 30, 10));
~~~
        </ul>
    </li>
    <li>
    	<b class=submethod>hour_start (date): Date</b> - returns a Date object of the specified date and clears the part with minutes and seconds to zero
        <ul>
          	<li><b><i>date</i></b> - (<i>Date</i>) the date object to format </li>
~~~js
//29 June, 2019 14:30:10 -> 29 June, 2019 14:00:00
var date = gantt.date.hour_start(new Date(2019, 05, 29, 14, 30, 10));
~~~
        </ul>
    </li>
    <li>
    	<b class=submethod>week_start (date): Date</b> - returns a Date object of the first day of the week for the specified date and clears the time part to zero
        <ul>
          	<li><b><i>date</i></b> - (<i>Date</i>) the date object to format </li>
~~~js
//29 June, 2019 14:30 -> 24 June, 2019 00:00
var weekStart = gantt.date.week_start(new Date(2019, 05, 29, 14, 30));
~~~
        </ul>
    </li>
    <li>
    	<b class=submethod>quarter_start (date): Date</b> - returns a Date object of the first month of the quarter for the specified date and clears the time part to zero
        <ul>
          	<li><b><i>date</i></b> - (<i>Date</i>) the date object to format </li>
~~~js
//29 June, 2019 14:30:10 -> 01 April, 2019 00:00:00
var date = gantt.date.quarter_start(new Date(2019, 05, 29, 14, 30, 10));
~~~
        </ul>
    </li>
    <li>
    	<b class=submethod>year_start (date): Date</b> - returns a Date object of the first day of the year for the specified date and clears the time part to zero
        <ul>
          	<li><b><i>date</i></b> - (<i>Date</i>) the date object to format </li>
~~~js
//29 June, 2019 14:30 -> 01 January, 2019 00:00
var yearStart = gantt.date.year_start(new Date(2019, 05, 29, 14, 30));
~~~
        </ul>
    </li>
</ul>

