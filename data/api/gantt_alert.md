alert
=============

@short:
	calls an alert message box
	

@params:

- config		AlertBoxConfig | string | number			either an object with the alert box's configuration or the text to show

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

The configuration object uses the following properties:

- <span class=subproperty>**id?**</span> - (*number | string*) - optional, the ID of the alert box
- <span class=subproperty>**text**</span> - (*number | string*) - the text of the alert box's body
- <span class=subproperty>**title?**</span> - (*number | string*) - optional, the text of the header
- <span class=subproperty>**ok?**</span> - (*number | string*) - optional, the text of the "OK" button
- <span class=subproperty>**position?**</span> - (*string*) - optional, the position of the alert box for now supports only one value - "top", any other value will result in "center-align"
- <span class=subproperty>**width?**</span> - (*string*) - optional, the width of the alert box (set as CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) or
	[&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) values, e.g. "100px", "50%")
- <span class=subproperty>**height?**</span> - (*string*) - optional, the height of the alert box (set as CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) or
	[&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) values, e.g. "100px", "50%")
- <span class=submethod>**callback? (result): void**</span> - optional, the function called on button click. Takes *true* as a parameter (subject to the clicked button)
    - **_result_** - (*boolean*) - result of the clicked button, always returns **true** (because there is only the "OK" button)


For additional details about supported configuration options of an alert message box, see the desktop/message_boxes.md article.


@relatedapi:
- api/gantt_confirm.md
- api/gantt_message.md
- api/gantt_modalbox.md

@related:desktop/message_boxes.md
@changelog:
added in version 4.0