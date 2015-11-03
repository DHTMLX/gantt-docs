Creating Message Boxes
======================

A Gantt Chart application can interact with the user via messages. They are used to notify about an error, confirm or deny an action, choose one of the options,
log events, display variable values, etc.

##Info Message Box

A basic message is created with the **gantt.message()** method that takes at least a message text as a parameter. 

~~~js
gantt.message("The task is updated");
~~~

This message is displayed in the right top corner of the window and doesn't prevent the work of the parent app while [modal message boxes](desktop/message_boxes.md#modalmessageboxes)
overlay the parent app and block its work.

**Message boxes:**
	
- Default 

<img src="desktop/default_message.png"/>
	
- Error (type:'error')

<img src="desktop/error_message.png"/>

{{sample 13_form/04_validation/02_complex_rule.html }}

###Message Types

As you can see in the above image, message boxes can be of two types:

- **default** (white background);
- **error** (red background).

The error message box has the **type** argument in addition to the **text** one and features an **extended form** of initialization: 

~~~js
gantt.message({type:"error", text:"Invalid data format"});
~~~

###Expire Interval

By default a message disappears either on mouse clicking somewhere outside it, or in 4000 milliseconds after appearing.

To change the expire interval or cancel it - use the **expire** parameter:

~~~js
gantt.message({
	type:"error", 
    text:"Invalid data format",
    expire:10000
    //expire:-1   for cancelling the expire period
});
~~~

If you cancel the expire period, such a message will disappear only on a mouse click.

Message boxes can be hidden **programmatically** as well:

~~~js
var message = gantt.message("Hi!");
gantt.message.hide(message);
~~~

##Modal Message Boxes

**Message boxes** prevent the workflow on the parent app until you perform actions required by them (button clicking, as a rule). 
Message boxes close on a button click and a callback function, if any is executed.

Message boxes contain some text and an "OK" button. There exist three types of modal message boxes:

- [gantt.alert()](#alert) - an alert box with a button
- [gantt.confirm()](#confirm) - a confirmation box with two buttons to confirm or cancel. 
- [gantt.modalbox()](#modal) - a modal message box with as many buttons as you wish. 

The boxes share common properties. They are:

- **title** - text of the header;
- **ok** - text of the "OK" button;
- **cancel** - text of the "Cancel" button (only for the confirmation box);
- **text** - text of the window body; 
- **callback** - function that is executed on a button click. A callback function may include another message box, the content of which depends on your choice in the previous step;
- **type** - type of the button (warning or error).

The callback function takes the **result** of user communication with a message box as a parameter. It can be:

- **boolean true** - each time you press its **"OK"**, *true* is passed to the box callback. It's the only possible value for the alert box as it features the "OK" button only;
- **boolean false** - each time you press **"Cancel"**, *false* is passed to the callback. Works for the confirm box;
- **Button index** - true for the modal box. It stores the index of the clicked button (zero-based numbering).

The result is used in the callback function that defines further actions according to its value (*true* or *false*). 

At the same time, callback can be set regardless of the result, as a function will be executed on button click.

##Initialization

###gantt.alert {#alert}

<img src="desktop/alert_box.png"/>

The text of its only button is defined as the value of the **ok** parameter. Passing of the result into the callback is optional. 

~~~js
//the shortest form
gantt.alert("Text");

//short form with callback
gantt.alert("Test alert", function(result){....});

// long form
gantt.alert({
	title:"Custom title",
	ok:"Custom text",
    type:"alert-warning",
	text:"Warning",
	callback:function(){...}
});
~~~

{{sample 10_window/03_alert.html }}

###gantt.confirm {#confirm}

<img src="desktop/confirm_box.png"/>

Confirm message boxes contain two buttons - "ok" and "cancel", the text of which is defined in the same-name properties. 

~~~js
gantt.confirm({
	title:"Custom title",
	ok:"Yes", 
    cancel:"No",
    type:"confirm-error",
	text:"Test confirm",
    callback:function(result){ //setting callback
    	gantt.alert({
        	title:"Your Choice",
            text:"Result" +result //using callback
        });
   }
});
~~~

{{sample 10_window/04_confirm.html }}

##Modal Box {#modal}

<img src="desktop/modalbox.png"/>

A modalbox resembles alert and confirm in its modality, yet features several peculiarities: 

- its **text** can include any **HTML** content;
- it may contain as many buttons as you wish defined in the **buttons** array that contains text values for each one;
- the **callback** takes the **index** of the chosen button as a parameter;
- it can be **sized** with width and height parameters.

~~~js
gantt.modalbox({
	title:"Custom title",
	buttons:["Yes", "No", "Maybe"],
	text:"Any html content here",
    width: "500px",
    callback: function(result){
    	switch(result){
		case 0: 
        	//statement
            break;
        case 1:
        	//statement
            break;
        ...
        }
    }
});
~~~

{{sample }}

##Modal Windows and Keyboard Interaction

The keyboard functionality for modal boxes is controlled by the **gantt.message.keyboard** property that is initially true. 

By default, modal boxes block keyboard events of the page. Users can use only the following keys that set the modal box's value and close it: 

- **"space"** and **"enter"** for setting **true** value as a modal box result;
- **"escape"** for setting **false** value as a modal box result.

To enable keyboard events (and disable the above mentioned keys), you should set the **keyboard** property to false:

~~~js
gantt.keyboard.message = false; 
gantt.modalbox({...})
~~~

From now on, the user gets a possibility to use the full keyboard, for instance, for typing values into inputs inside modal boxes. 


@complexity:2