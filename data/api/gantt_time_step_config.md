time_step
=============
@short:sets the minimum step (in minutes) for the task's time values


@type: number
@default:60
@example:
gantt.config.time_step = 15;
...
gantt.init("gantt_here");


@template:	api_config
@descr:

- Start and end times of a task will have the values multiple of the time step, i.e. if *time_step = 20*, the task can start only at: 0, 20, 40 minutes etc.
- The lightbox time selector will have the same time step.

{{note If you want a task to be dragged with the step set via the **time_step** property, you need to set the api/gantt_round_dnd_dates_config.md config to *false*.
~~~js
gantt.config.round_dnd_dates = false;
~~~
}}

{{editor	https://snippet.dhtmlx.com/bd7ir3w7	Gantt. Drag'n'drop of tasks with the minimum step 
}}

@relatedapi:
api/gantt_round_dnd_dates_config.md