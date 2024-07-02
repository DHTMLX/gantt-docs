message
=============


@short:
	calls a message box of the specified type

@params:

- config		object|string|number			either an object with the message box's configuration or the text to show

@returns:

- div			HTMLElement		the div container of the message box


@example:
let box = gantt.message({ 
    type:"confirm-warning", 
    text:"Are you sure you want to do it?"
});

// or
box = gantt.message("This is the message");

@template:	api_method
@descr:
For details about supported configuration options of a message box, see the desktop/message_boxes.md article.


The configuration object uses the following properties:

- <span class=subproperty>**id?**</span> - (*number | string*) - optional, the ID of the popup message
- <span class=subproperty>**text**</span> - (*number | string*) - the content of the popup message
- <span class=subproperty>**type?**</span> - (*string*) - optional, the class name of the popup message
- <span class=subproperty>**expire?**</span> - (*number*) - optional, the time period until the popup message disappears. -1 means, it won't hide yb itself


The **message** property can be a function, but can also be used as a configuration object for the popup message. It has the following properties:

- <span class=subproperty>**position**</span> - (*string*) - the position of the popup message. Possible values: "top", "bottom", "left", "right"

~~~js
gantt.message.position = "left";
~~~
- <span class=submethod>**hide (id): any**</span> - a function that hides the popup message. Uses **id** as a parameter:
    - **_id_** - (*number | string*) - the ID of the popup message
~~~js
gantt.message.hide("popupId");
~~~



@relatedapi:
- api/gantt_alert.md
- api/gantt_confirm.md
- api/gantt_modalbox.md
@related:desktop/message_boxes.md
@changelog:
added in version 4.0