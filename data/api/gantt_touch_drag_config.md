touch_drag
=============
@short:defines the time period in milliseconds that is used to differ the long touch gesture from the scroll gesture
	
@type:number, boolean
@default:500
@example:
gantt.config.touch_drag = 75;
...
gantt.init("gantt_here");


@template:	api_config
@relatedapi:
	api/gantt_touch_config.md
    api/gantt_touch_feedback_config.md
    api/gantt_touch_feedback_duration_config.md
    
@descr:
Note, if you set the parameter to *false*, the user won't be able to drag tasks.
