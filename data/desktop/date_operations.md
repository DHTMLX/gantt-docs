Operating with Dates
==============
dhtmlxGantt includes the api/gantt_date_other.md object  that provides a set of date formatting methods. You can use these methods while working with the date objects.

In this article we will consider the particularly important and commonly used methods. A full list of methods you can find at the [date object page](api/gantt_date_other.md).


Converting a Date object to a string
-------------------------------------------------------

To convert a Date object to a string, use the [date_to_str](api/gantt_date_other.md) method: <br> 
*The method returns a function that converts a Date object to a string of the specified format:*
~~~js
var formatFunc = gantt.date.date_to_str("%d/%m/%Y");
var date = formatFunc(new Date(2013, 05, 29)); // -> "29/06/2013"
~~~


Converting a string to a Date object
-----------------------------------------------------
To convert a string to a Date object, use the [str_to_date](api/gantt_date_other.md) method: <br> 
*The method returns a function that converts a string of the specified format to a Date object:*


You can generate a date convert function as follows:

~~~js
var formatFunc = gantt.date.str_to_date("%d/%m/%Y");
var date = formatFunc("29/06/2013"); // -> 29 June, 2013 00:00:00
~~~



Converting to UTC
--------------------------------------
To convert local time to UTC, use the [convert_to_utc](api/gantt_date_other.md) method:

~~~js
//29 June, 2013 14:00 (local time) -> 29 June, 2013 12:00 (utc)
var time = gantt.date.convert_to_utc(new Date(2013, 05, 29, 14, 00));
~~~

Adding(subtracting) a time interval to(from) a date
----------------------------------------------------------
To add(subtract) a time interval to(from) the specified date, use the [add](api/gantt_date_other.md) method:

~~~js
//adds 1 year to the specified date: 29 June, 2013 -> 29 June, 2014
var newDate = gantt.date.add(new Date(2013, 05, 29), 1, 'year');
~~~


{{note
A full list of date formatting methods see [here](api/gantt_date_other.md).
}}