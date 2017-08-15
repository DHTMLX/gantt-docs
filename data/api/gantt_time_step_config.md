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

- Start and end times of a task will have the values multiple of the time step, i.e. if *time_step = 20*, the event can start only at: 0, 20, 40 minutes etc. 
- The lightbox time selector will have the same time step.


