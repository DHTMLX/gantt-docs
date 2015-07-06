min_duration
=============
@short:sets the minimum step (in milliseconds) for task's time values
@default:60*60*1000

@type:number 
@example:


@template:	api_config
@descr:
- Start and end times of a task will have values multiple of the **min_duration**, i.e. if **min_duration = 20&#42;60&#42;1000**, the task can start only at: 0, 20, 40 minutes etc.
- The lightbox time selector (if added to the lighbox) will have the same time step.

