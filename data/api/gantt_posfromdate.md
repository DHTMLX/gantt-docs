posFromDate
=============
@short:gets the relative horizontal position of the specified date in the chart area
	

@params:
- date	Date	a date you want to know the position of





@example:
gantt.posFromDate(new Date());

@template:	api_method
@descr:
{{note
The method returns the position of a date that is currently rendered in the Gantt chart. If a date isn't rendered in the chart - the method will return 'null'.
}}

<img style="padding-top:15px; padding-bottom:15px;" src="desktop/gantt_localized.png"/>

For example, for the Gantt chart above, the method will return the following:

~~~js
gantt.posFromDate(new Date(2013,02,31)); // -> 0
gantt.posFromDate(new Date(2013,03,1));  // -> 74
gantt.posFromDate(new Date(2013,03,2));  // -> 148
~~~ 