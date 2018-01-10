Popup Messages and Modal Boxes
======================

Messages are used in a Gantt Chart to notify a user about an error, confirm or deny an action, choose one of the options and so on.
Gantt Chart messages use [the fork of the dhtmlxMessage repository](https://github.com/DHTMLX/message) as their basis. 
So, all the functionality of dhtmlxMessage is actual for dhtmlxGantt messages.

There are two main types of messages: a simple popup message box and a modal message box with buttons that blocks the work of an application.

A modal message box can belong to one of three possible types:

- Alert message box
- Confirm message box
- Modalbox


##Basic Popup Message 

To create a basic modal message box, use the [gantt.message](api/gantt_message.md) method. The obligatory parameter of the method is the text of the message:

~~~js
gantt.message("The task is updated");
~~~

A popup message box appears in the right top corner of the window. It doesn't prevent the work of the parent application, unlike [modal message boxes](desktop/message_boxes.md#modalmessageboxes)
that overlay the parent application and block its work.

There are two types of message boxes:
	
- a default message box

<img src="desktop/default_message.png"/>
	
- an error message box

<img src="desktop/error_message.png"/>


To create an error message box, you need to define the *type* property with the "error" value: 

~~~js
gantt.message({type:"error", text:"Invalid data format"});
~~~

###Expire Interval

It's possible to customize the expire interval for a message box with the help of the *expire* parameter. It is the time period after the end of which the message box disappears (in milliseconds).
By default, the expire interval is equal to 4000 milliseconds. 

You can either change this value or to cancel the expire period at all, by setting the expire parameter to "-1". In this case 
a message box will disappear only on a mouse click.

~~~js
gantt.message({
	type:"error", 
    text:"Invalid data format",
    expire:10000
});
~~~

To hide the specified message box manually and not to wait while it hides automatically, you can use the dhtmlx.message.hide(boxId) method.

{{note
The method can't be used with dhtmlx.alert and dhtmlx.confirm
}}


- boxId - the box id specified in the box's constructor

~~~js
dhtmlx.message({
    id:"myBox",
    text:"Page is loaded"
});
..
gantt.message.hide("myBox");
~~~

##Modal Message Boxes

Modal message boxes prevent the work of the parent app, until a necessary action is performed (usually, button clicking). 
They close on a button click and a callback function, if any is executed.

There exist three types of modal message boxes:

- [Alert Message Box](#alert) - an alert box with a button;
- [Confirm Message Box](#confirm) - a confirmation box with two buttons (to confirm or to cancel); 
- [Modalbox](#modal) - a modal message box with an unlimited number of buttons. 

Common properties of the boxes are:

- **id** - the message box's id;
- **title** - the text of the header;
- **type** - the type of the message box (a warning or an error);
- **text** - the text of the message box's body; 
- **ok** - the text of the "OK" button;
- **cancel** - the text of the "Cancel" button (for the confirm box);
- **callback** - the function called on button click. Takes *true* or *false* as the parameter (subject to the clicked button);
- **position** - for now supports only one value - "top", any other value will result in center-align;
- **width**	- the width of the modal box (set as CSS [&#60;length&#62;](https://developer.mozilla.org/en/docs/Web/CSS/length) or
	[&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) values, e.g. "100px", "50%");
- **height** - the height of the modal box (set as CSS [&#60;length&#62;](https://developer.mozilla.org/en/docs/Web/CSS/length) or
	[&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) values, e.g. "100px", "50%").


##Initialization

###Alert Message Box {#alert}

<img src="desktop/alert.png"/>

An alert message box contains the "OK" button. To set the text of the "OK" button, use the *ok* parameter with the text as a value:

- a short form (contains just the text of a message - implicit usage of the parameter 'text'. The other parameters take default values):

~~~js
gantt.alert("Text");
~~~

- a full form (contains several available parameters. Non-specified parameters take default values)

~~~js
gantt.alert({
    text:"some text",
    title:"Error!",
    ok:"Yes",
	callback:function(){...}
});
~~~


###Confirm Message Box {#confirm}

<img src="desktop/confirm.png"/>

A confirm message box has two buttons - the "OK" button and the "Cancel" one. The text of the buttons is defined in the properties with the corresponding names. 


- a short form

~~~js
gantt.confirm("ConfirmText");
~~~

- a full form

~~~js
gantt.confirm({
    text: "Continue?",
    ok:"Yes", 
    cancel:"No",
    callback: function(result){
        gantt.message("Result: "+result);
    }
});
~~~


##Modal Box {#modal}

<img src="desktop/modalbox.png"/>

A modalbox posesses some peculiar features: 

- its *text* can include any *HTML* content;
- it may have many buttons specified in the *buttons* array that contains text values for of the buttons;
- the *callback* function takes the *index* of the chosen button as a parameter.

~~~js
gantt.modalbox({
	title:"Settings"
    text: " ... html code here... ",
    buttons:["Save", "Defaults", "Cancel"],
    callback: function(result){
        gantt.alert(result);
    }
});
~~~

###Configuring modalbox buttons

There are two main ways to define the configuration of modalbox buttons:

- a short form:

~~~js
gantt.modalbox({
	// other settings
	buttons:["Save", "Delete", "Cancel"],
	callback: function(result){
   		switch(result){
			case "0":
				//Save
				break;
			case "1":
				//Delete
				break;
			case "2":
				//Cancel
				break;
		}	
	}
});
~~~

The result of the callback function will be equal to the stringified index of a pressed button from the array ("0", "1", "2",...).
Each button will receive a CSS class from its label converted to the lower case, e.g. *gantt_**save**_button*, *gantt_**delete**_button*, *gantt_**cancel**_button*. 

These classes can be used to style buttons:

~~~js
.gantt_delete_button div{
	background:red;
}
~~~

In case the same button name is used by several popups that should be styled differently, the **type** config can be used:

~~~js
gantt.modalbox({
	// other settings
	type:"special_popup",
	buttons:["Save", "Delete", "Cancel"]
});
~~~

The **type** will be prefixed with the "gantt_" string and added as a class name to the popup element:

~~~js
.gantt_special_popup .gantt_delete_button div{
  	background:red;
}
~~~

- a full form:

The CSS classes of buttons and callback values can be defined explicitly using a longer form of configuration:

~~~js
gantt.modalbox({
	// other settings
    buttons: [
		{ label:"Save",   css:"link_save_btn",   value:"save" },
		{ label:"Cancel", css:"link_cancel_btn", value:"cancel" },
		{ label:"Delete", css:"link_delete_btn", value:"delete" }
    ],
    callback: function(result){
		switch(result){
    		case "save":
    			//Save
    			break;
            case "cancel":
                //Cancel
                break;
            case "delete":
                //Delete
                break;
		}
    }
});
~~~

The **label** parameter is mandatory, while **css** and **value** options can be omitted. Missing parameters will be calculated as in the short form of buttons configuration: CSS will be inherited from a lower-cased button label and the button index will be used as a value.


The **css** will be prefixed with the "gantt_" string and added to the button element as a class name:

~~~js
.gantt_link_delete_btn div{
  	background:red;
}
~~~

##Styling

For any type of the message box you can define a custom style to achieve the desired look.
Generally, the appropriate css class is specified through the parameter *type*: you define a css class and set the parameter to its name.

While creating a css class, please, use the 'important' keyword to ensure correct processing.

There are some rules related to setting the 'type' parameter you should keep in mind:

- To set a css class for the alert and confirm boxes, you must initialize such a box using the 'window-related' way.
- To set a css class for the message boxes, you must initialize such a box using the 'common' way.
- The name of a css class should go with the 'gantt-' prefix.

~~~js
<style type="text/css">
.gantt-myCss{
    font-weight:bold !important;
    color:white !important;
    background-color:red !important;
}
</style>
...
gantt.message({ type:"myCss", text:"some text" });
~~~

##Modal Windows and Keyboard Interaction

The keyboard functionality for modal boxes is controlled by the **gantt.message.keyboard** property. Initially, it's set to *true*. 

By default, modal boxes block keyboard events of the page. The only keys that can be used are: 

- "space" and "enter" - sets the *true* value as a modal box result;
- "escape" - sets the *false* value as a modal box result.

By setting the **keyboard** property to *false*, you'll enable keyboard events (and disable the above mentioned keys):

~~~js
gantt.message.keyboard = false; 
gantt.modalbox({...});
~~~

It allows using the full keyboard, e.g. for typing values into inputs inside modal boxes. 

