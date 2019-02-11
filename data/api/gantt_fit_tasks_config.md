fit_tasks
=============
@short:'says' the Gantt chart to automatically extend the time scale in order to fit all displayed tasks 
	

@type: boolean
@default:false
@example:
gantt.config.fit_tasks = true; /*!*/
gantt.init("gantt_here");

@template:	api_config
@relatedapi:
	api/gantt_onscaleadjusted_event.md
	api/gantt_end_date_config.md
	api/gantt_start_date_config.md
	api/gantt_init.md
@relatedsample:
	03_scales/08_scale_autoconfig.html
@descr:

By default, dhtmlxGantt doesn't automatically extend the time scale, if some task no longer fits into the current interval. This can happen when a user sets the task date or after auto scheduling. 
In that case the task bar can be truncated or not visible at all.

To 'force' the scale re-render each time a task doesn't fit into the existing scale interval, set the api/gantt_fit_tasks_config.md property to *true*.

This setting can be canceled by the [start_date](api/gantt_start_date_config.md) and [end_date](api/gantt_end_date_config.md) configs, which will limit the time scale to specified boundaries.

If you want the time scale to be dynamically adjusted according to the date range, you can either skip the [start_date](api/gantt_start_date_config.md) and [end_date](api/gantt_end_date_config.md) configs or  [manage the time range dynamically](desktop/configuring_time_scale.md#range).

<br>

**For example, the initial duration of the task "Project #2" is 6 days.**


<img style="padding-top:10px;" src="api/property_fit_tasks_01.png"/>

If the user makes the duration longer by setting it say to 8 days, the Gantt chart will behave differently, depending on the value of the api/gantt_fit_tasks_config.md property:


- **gantt.config.fit_tasks = false;** (default value)

<img src="api/property_fit_tasks_02.png"/>

- **gantt.config.fit_tasks = true;** 

<img src="api/property_fit_tasks_03.png"/>