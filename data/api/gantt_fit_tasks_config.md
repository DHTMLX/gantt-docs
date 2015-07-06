fit_tasks
=============
@short:'says' the Gantt chart to re-render the scale each time a task doesn't fit into the existing scale interval
	

@type: boolean
@default:false
@example:
gantt.config.fit_tasks = true; /*!*/
gantt.init("gantt_here");

@template:	api_config
@relatedapi:
	api/gantt_onscaleadjusted_event.md
@relatedsample:
	03_scales/08_scale_autoconfig.html
@descr:


By default, dhtmlxGantt doesn't re-render the scale when the user makes some task longer and the task stops to fit into the existing scale interval.<br>
To 'force' the scale re-render each time a task doesn't fit into the existing scale interval, set the api/gantt_fit_tasks_config.md property to *true*.

<br>

**For example, the initial duration of the task "Project #2"  is 6 days.**


<img style="padding-top:10px;" src="api/property_fit_tasks_01.png"/>

If the user makes the duration longer and set it, e.g. to 8 days, the Gantt chart will behave differently, depending on the value of the  api/gantt_fit_tasks_config.md property:


- **gantt.config.fit_tasks = false;** (default value)

<img src="api/property_fit_tasks_02.png"/>

- **gantt.config.fit_tasks = true;** 

<img src="api/property_fit_tasks_03.png"/>