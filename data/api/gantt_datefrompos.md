dateFromPos
=============
@short:gets the date of the specified horizontal  position in the chart area


@params:
- pos	number	the relative horizontal position you want to know the date of

@returns:
- date	Date	the date of the specified horizontal  position in the chart area



@example:
var date = gantt.dateFromPos(200);

@template:	api_method
@descr:
{{note
The method returns a date that is currently rendered in the Gantt chart. If a date isn't rendered in the chart - the method will return 'null'.
}}

<img style="padding-top:15px; padding-bottom:15px;" src="desktop/gantt_localized.png"/>

For example, for the Gantt chart above, the method will return the following:

~~~js
gantt.dateFromPos(0); // -> Sun Mar 31 2013 00:00:00
gantt.dateFromPos(74);  // -> Mon Apr 01 2013 01:22:17
~~~
