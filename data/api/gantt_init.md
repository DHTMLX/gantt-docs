init
=============

@short: initializes a dhtmlxGantt inside a container
	

@params:
- container		string | HTMLElement		an HTML container (or its id) where a dhtmlxGantt object will be initialized
* from			Date					the start value of the time scale (X&ndash;Axis)
* to			Date					the end value of the time scale (X&ndash;Axis)



@example:
gantt.config.scale_unit = "month";
gantt.config.date_scale = "%F, %Y";

gantt.init("gantt_here");
gantt.load("tasks.json");

@related:
	desktop/initializing_gantt_chart.md
@relatedapi:
	api/gantt_start_date_config.md
	api/gantt_end_date_config.md
	api/gantt_fit_tasks_config.md
    
@template:	api_method
@descr:
Using the 2nd and 3rd parameters of the method is a good way to set the boundary values of the time scale:

~~~js
gantt.init("gantt_here", new Date(2023, 08, 10), new Date(2023, 08, 20));
~~~

Note, that date paremeters of the `gantt.init` method are shortcuts for [start_date](api/gantt_start_date_config.md) and [end_date](api/gantt_end_date_config.md) configs.
The two code snippets below are equivalent to each other:

~~~js
gantt.init("gantt_here", new Date(2023, 08, 10), new Date(2023, 08, 20));
~~~

and

~~~js
gantt.config.start_date = new Date(2023, 08, 10);
gantt.config.end_date = new Date(2023, 08, 20);
gantt.init("gantt_here");
~~~

What these configs do is define and limit the displayed date range. Tasks that fall outside that specified range won't be displayed.

Using the date parameters of the `gantt.init` method, as well as [start_date](api/gantt_start_date_config.md) and [end_date](api/gantt_end_date_config.md) configs will cancel the
[fit_tasks](api/gantt_fit_tasks_config.md) setting.

If you want the time scale to be dynamically adjusted according to the date range, you can either skip these parameters or [manage the time range dynamically](desktop/configuring_time_scale.md#range).

{{note This method resets custom layers added to the timeline area via the api/gantt_addtasklayer.md and api/gantt_addlinklayer.md methods. Therefore, you need to redefine these ones after calling the **gantt.init** method in order for custom layers to be displayed on a page.}}