touch_feedback
=============

@short: returns vibration feedback before/after drag and drop on touch devices
	
@default: true
@type: boolean
@example:
gantt.config.touch_feedback = false;
...
gantt.init("gantt_here");

@template:	api_config
@descr:
Note, the config will have no effect if: 

1. The touch support is disabled by the configuration option [touch](api/gantt_touch_config.md).
2. The browser doesn't support the [Vibration API](https://caniuse.com/vibration).

@relatedapi:
	api/gantt_touch_config.md
    api/gantt_touch_drag_config.md
    api/gantt_touch_feedback_duration_config.md