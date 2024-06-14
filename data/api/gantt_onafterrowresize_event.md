onAfterRowResize
=============


@short: fires after resizing of the row height is finished
	

@params:
- id	string|number	the task id
- task	Task	the item object
- oldHeight	number	the old height of the row
- newHeight	number	the new height of the row

@example:
gantt.attachEvent("onAfterRowResize", function (id, task, oldHeight, newHeight) {
	gantt.message(`<b>${item.text}</b> was <b>${oldHeight}px</b> height.<br>
	<b>${item.text}</b> is now <b>${newHeight}px</b> height`);
});

@template:	api_event
@descr:

@changelog: added in v7.1

@relatedapi: 
api/gantt_resize_rows_config.md
api/gantt_onbeforerowresize_event.md
api/gantt_onrowresize_event.md
api/gantt_onbeforerowresizeend_event.md


@relatedsample: 02_extensions/28_row_resize.html