touch_feedback
=============

@short:enables/disables vibration while moving tasks on touch devices
	
@default: true
@type: boolean
@example:
gantt.config.touch_feedback = false;
gantt.init("gantt_here");

@template:	api_config
@descr:
Note, the method will have no effect if: 

1. The touch support is disabled by the configuration option [touch](api/gantt_touch_config.md).
2. The browser doesn't support the [Vibration API](http://caniuse.com/#feat=vibration).

