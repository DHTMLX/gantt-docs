autoscroll
=============


@short:
	enables autoscrolling while dragging a task or link out of the current browser screen

@type: boolean
@default:true

@example:
gantt.config.autoscroll = false;
gantt.init("gantt_here");

@template:	api_config
@descr:
You need to use [the reserved views and their ids for scrollbars](desktop/layout_config.md#requiredviewsandsettings) while using the **autoscroll** option. 

~~~js
//horizontal scrollbar:
{view: "scrollbar", id: "scrollHor"}
//vertical scrollbar:
{view: "scrollbar", id: "scrollVer"}
~~~

If you use different names, the scrollbars will work but the "autoscroll" functionality won't. 



@relatedapi:
api/gantt_autoscroll_speed_config.md


@relatedsample:
02_extensions/13_smart_rendering.html

@changelog: added in version 4.2