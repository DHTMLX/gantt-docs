autoscroll
=============


@short:
	enables autoscrolling while dragging a task or a link out of the current browser screen

@type: boolean
@default:true

@example:
gantt.config.autoscroll = false;
gantt.init("gantt_here");

@template:	api_config
@descr:
Note that **up to version 7.1.11**
you need to use [the reserved views and their ids for scrollbars](desktop/layout_config.md#requiredviewsandsettings) while using the **autoscroll** option. 

~~~js
// horizontal scrollbar:
{view: "scrollbar", id: "scrollHor"}
// vertical scrollbar:
{view: "scrollbar", id: "scrollVer"}
~~~

If you use different names, the scrollbars will work, but the "autoscroll" functionality won't. 

Starting from v7.1.11, you can use any names for scrollbars.

@relatedapi:
api/gantt_autoscroll_speed_config.md


@relatedsample:
02_extensions/13_smart_rendering.html

@changelog: added in version 4.2