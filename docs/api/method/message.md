---
sidebar_label: message
title: message method
description: "calls a message box of the specified type"
---

# message

### Description

@short: Calls a message box of the specified type

@signature: message: MessagePopupObject

### Parameters

- `config` - (required) *object | string | number* -            either an object with the message box's configuration or the text to show

### Returns
- ` id` - (string | number) - the ID of the message box

### Example

~~~jsx
let box = gantt.message({ 
    type:"warning", 
    text:"Are you sure you want to do it?"
});

// or
box = gantt.message("This is the message");
~~~

### Details

The configuration object uses the following properties:

- **id?** - (*number | string*) - optional, the ID of the popup message
- **text** - (*number | string*) - the content of the popup message
- **type?** - (*string*) - optional, the class name of the popup message
- **expire?** - (*number*) - optional, the time period until the popup message disappears. -1 means, it won't hide by itself


The **message** property can be a function, but can also be used as a configuration object for the popup message. It has the following properties:

- **position** - (*string*) - the position of the popup message. Possible values are: "top", "bottom", "left", "right"

~~~js
gantt.message.position = "left";
~~~
- **keyboard** - (*boolean*) - specifies if Gantt should block keyboard events. *true* by default.

~~~js
gantt.message.keyboard = false;
~~~
- **hide (id): any** - a function that hides the popup message. Uses **id** as a parameter:
    - **_id_** - (*number | string*) - the ID of the popup message
~~~js
gantt.message.hide("popupId");
~~~

For additional details about supported configuration options of a message box, see the [Popup Messages and Modal Boxes](guides/message-boxes.md) article.

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [Popup Messages and Modal Boxes](guides/message-boxes.md)

### Change log
- added in version 4.0

