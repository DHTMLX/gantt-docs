init
=============
@short: constructor. Initializes a dhtmlxGantt object
	

@params:
- container	string, HTMLElement		an HTML container ( or its id) where a dhtmlxGantt object will be initialized
* from	Date	the start value of the time scale	(X&ndash;Axis)
* to	Date	the end value of the time scale (X&ndash;Axis)



@example:
gantt.config.scale_unit = "month";
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");
gantt.load("tasks.json");

@related:
	desktop/initializing_gantt_chart.md
@template:	api_method
@descr:
Using the 2nd and 3rd parameters of the method is a good way to set the  boundary values of the time scale:

~~~js
gantt.init("gantt_here", new Date(2013, 08, 10), new Date(2013, 08, 20));
~~~