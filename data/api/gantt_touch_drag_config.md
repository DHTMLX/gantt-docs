touch_drag
=============
@short:defines the time period in milliseconds that is used to differ the long touch gesture from the scroll gesture
	
@type:number, boolean
@default:50
@example:
gantt.touch_drag = 75;
...
gantt.init("gantt_here");


@template:	api_config
@relatedapi:
	api/gantt_touch_config.md
    
@descr:
Note, if you set the parameter to *false*, the user won't be able to drag tasks.
