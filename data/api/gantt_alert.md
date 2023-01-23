alert
=============

@short:
	calls an alert message box
	

@params:

- config		object|string|number			either an object with the alert box's configuration or the text to show

@returns:

- div			HTMLElement		the div container of the alert box

@example:
var box = gantt.alert({
    title:"Alert",
    type:"alert-error",
    text:"You can't do this"
});

// or
var box = gantt.alert("This is an alert box");


@template:	api_method
@descr:
For details about supported configuration options of an alert message box, see the desktop/message_boxes.md article.


@relatedapi:
- api/gantt_confirm.md
- api/gantt_message.md
- api/gantt_modalbox.md

@related:desktop/message_boxes.md
@changelog:
added in version 4.0