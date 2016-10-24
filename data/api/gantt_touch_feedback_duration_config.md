touch_feedback_duration
=============

@short:
	defines the duration of vibration feedback before/after drag and drop on touch devices (in milliseconds)

@type: number
@example:
gantt.config.touch_feedback_duration = 1;
...
gantt.init("gantt_here");


@template:	api_config
@descr:
added in version 4.1 

Note, the config will have no effect if: 

1. The touch support is disabled by the configuration option [touch](api/gantt_touch_config.md).
2. The browser doesn't support the [Vibration API](http://caniuse.com/#feat=vibration).

@relatedapi:
	api/gantt_touch_config.md
    api/gantt_touch_drag_config.md
    api/gantt_touch_feedback_config.md