onRowResize
=============


@short: fires when the user is dragging the border of the row to resize the row height
	

@params:
- id	string|number	the task id
- task	Task	the task object
- currentHeight	number	the current height of the row

@example:
gantt.attachEvent("onRowResize", function (id, task, currentHeight) {
	gantt.message({
		expire: -1,
		text: `<b>${task.text}</b> is now <b>${currentHeight}px</b> height`
	});
});

@template:	api_event
@descr:

@changelog: added in v7.1

@relatedapi: 
api/gantt_resize_rows_config.md
api/gantt_onbeforerowresize_event.md
api/gantt_onbeforerowresizeend_event.md
api/gantt_onafterrowresize_event.md

@relatedsample: 02_extensions/28_row_resize.html