modalbox
=============

@short:
	calls a modalbox

@params:

- config		ModalBoxConfig			the modal box's configuration

@returns:

- div			HTMLElement		the div container of the modalbox

@example:

let box = gantt.modalbox({
	title: "Close",
 	type: "alert-warning"
});

@template:	api_method
@descr:

The configuration object uses the following properties:

- <span class=subproperty>**id?**</span> - (*number | string*) - optional, the ID of the modal box
- <span class=subproperty>**text**</span> - (*number | string*) - the text of the modal box's body
- <span class=subproperty>**title?**</span> - (*number | string*) - optional, the text of the header
- <span class=subproperty>**position?**</span> - (*string*) - optional, the position of the modal box for now supports only one value - "top", any other value will result in center-align;
- <span class=subproperty>**buttons**</span> - (*string[] | number[] | ModalboxButton[]*) - the array of buttons
- <span class=subproperty>**width?**</span> - (*string*) - optional, the width of the modal box (set as CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) or
	[&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) values, e.g. "100px", "50%");
- <span class=subproperty>**height?**</span> - (*string*) - optional, the height of the modal box (set as CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) or
	[&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) values, e.g. "100px", "50%");
- <span class=submethod>**callback? (result): void**</span> - optional, the function called on button click. Takes true or false as the parameter (subject to the clicked button);
    - **_result_** - (*string | number | boolean*) - The result of the callback function will be equal to the stringified index of a pressed button from the array ("0", "1", "2",...).


The ModalboxButton has the following types:

- <span class=subproperty>**label**</span> - (*string | number*) - the text of the button
- <span class=subproperty>**value?**</span> - (*string | number | boolean*) - optional, the value that is returned in the *result* argument of the *callback* function.
- <span class=subproperty>**css?**</span> - (*string | number*) - optional, a custom class name for the button, prefixed with the "gantt_" string.


For additional details about supported configuration options of a modalbox, see the desktop/message_boxes.md article.



@related:desktop/message_boxes.md
@relatedapi:
- api/gantt_alert.md
- api/gantt_confirm.md
- api/gantt_message.md
@changelog:
added in version 4.0
