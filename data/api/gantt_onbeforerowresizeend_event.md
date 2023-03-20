onBeforeRowResizeEnd
=============

@short: fires before resizing of the row height is completed 
	

@params:
- id 	number|string	the task id
- item	object	the task object
- newHeight	number	the new height of the row

@returns:  
- result     boolean       defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 

@example:
gantt.attachEvent("onBeforeRowResizeEnd", function (id, item, newHeight) {
	gantt.message.hide(message);
	message = null;
	gantt.message(`<b>${item.text}</b> is now <b>${newHeight}px</b> height`);
	return true;
});

@template:	api_event
@descr:

@changelog: added in v7.1

@relatedapi: 
api/gantt_resize_rows_config.md
api/gantt_onbeforerowresize_event.md
api/gantt_onrowresize_event.md
api/gantt_onafterrowresize_event.md

@relatedsample: 02_extensions/28_row_resize.html