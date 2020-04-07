message
=============


@short:
	calls a message box of the specified type

@params:

- config		object			the message box's configuration

@returns:

- div			HTMLElement		the div container of the message box


@example:
var box = gantt.message({ 
    type:"confirm-warning", 
    text:"Are you sure you want to do it?"
});

@template:	api_method
@descr:
For details about supported configuration options of a message box, see the desktop/message_boxes.md article.


@relatedapi:
- api/gantt_alert.md
- api/gantt_confirm.md
- api/gantt_modalbox.md
@related:desktop/message_boxes.md
@changelog:
added in version 4.0