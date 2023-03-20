onBeforeRowResize
=============

@short: fires before the user starts to resize the row height by drag-and-drop
	

@params:
- item	object	the task object

@returns:
- param	boolean	defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

@example:
gantt.attachEvent("onBeforeRowResize", function (item) {
	gantt.message(`Start resizing <b>${item.text}</b>`);
	return true;
});

@template:	api_event
@descr:
The event is blockable. Returning *false* will prevent the row height from being resized.

@changelog: added in v7.1

@relatedapi: 
api/gantt_resize_rows_config.md
api/gantt_onrowresize_event.md
api/gantt_onbeforerowresizeend_event.md
api/gantt_onafterrowresize_event.md

@relatedsample: 02_extensions/28_row_resize.html