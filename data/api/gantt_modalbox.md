modalbox
=============

@short:
	calls a modalbox

@params:

- config		object			the modal box's configuration

@returns:

- div			HTMLElement		the div container of the modalbox

@example:

let box = gantt.modalbox({
	title: "Close",
 	type: "alert-warning"
});

@template:	api_method
@descr:
For details about supported configuration options of a modalbox, see the desktop/message_boxes.md article.


@related:desktop/message_boxes.md
@relatedapi:
- api/gantt_alert.md
- api/gantt_confirm.md
- api/gantt_message.md
@changelog:
added in version 4.0
