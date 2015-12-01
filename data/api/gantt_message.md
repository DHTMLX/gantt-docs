message
=============


@short:
	calls a message box of the specified type

@params:

- config		object			the message box's configuration


@example:

gantt.message({ 
    type:"confirm-warning", 
    text:"Are you sure you want to do it?"
});

@template:	api_method
@descr:
@relatedapi:
- api/gantt_alert.md
- api/gantt_confirm.md
- api/gantt_modalbox.md
@related:desktop/message_boxes.md
@changelog:
added in version 4.0