alert
=============

@short:
	calls an alert message box
	

@params:

- config		object			the alert box's configuration

@returns:

- div			HTMLElement		the div container of the alert box

@example:
var box = gantt.alert({
    title:"Alert",
    type:"alert-error",
    text:"You can't do this"
});


@template:	api_method
@descr:
@relatedapi:
- api/gantt_confirm.md
- api/gantt_message.md
- api/gantt_modalbox.md

@related:desktop/message_boxes.md
@changelog:
added in version 4.0