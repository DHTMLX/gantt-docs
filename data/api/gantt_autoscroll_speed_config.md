autoscroll_speed
=============

@todo:
	check 


@short:
	defines the speed of autoscrolling (in ms) while dragging a task or link out of the current browser screen 

@type: number
@default:30
@example:
gantt.config.autoscroll = true;
gantt.config.autoscroll_speed = 50;

gantt.init("gantt_here");

@template:	api_config
@descr:
The "autoscroll" functionality is enabled by the api/gantt_autoscroll_config.md option.

@relatedapi:
api/gantt_autoscroll_config.md