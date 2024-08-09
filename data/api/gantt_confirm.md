confirm
=============

@short:
	calls a confirm message box

@params:

- config		ConfirmBoxConfig | string | number			either an object with the confirm box's configuration or the text to show

@returns:

- div			HTMLElement		the div container of the confirm box

@example:
var box = gantt.confirm({
    text: "Continue?",
    ok:"Yes", 
    cancel:"No",
    callback: function(result){
        if(result){
            gantt.message("Yes!");
        }else{
            gantt.message("No...");
        }
    }
});

// or
var box = gantt.confirm("Do you want to continue?");

@template:	api_method
@descr:

The configuration object uses the following properties:

- <span class=subproperty>**id?**</span> - (*number | string*) - optional, the ID of the confirm box
- <span class=subproperty>**text**</span> - (*number | string*) - the text of the confirm box's body
- <span class=subproperty>**title?**</span> - (*number | string*) - optional, the text of the header
- <span class=subproperty>**ok?**</span> - (*number | string*) - optional, the text of the "OK" button;
- <span class=subproperty>**cancel?**</span> - (*number | string*) - optional, the text of the "Cancel" button;
- <span class=subproperty>**position?**</span> - (*string*) - optional, the position of the confirm box for now supports only one value - "top", any other value will result in center-align;
- <span class=subproperty>**width?**</span> - (*string*) - optional, the width of the confirm box (set as CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) or
	[&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) values, e.g. "100px", "50%");
- <span class=subproperty>**height?**</span> - (*string*) - optional, the height of the confirm box (set as CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) or
	[&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) values, e.g. "100px", "50%");
- <span class=submethod>**callback? (result): void**</span> - optional, the function called on button click. Takes true or false as the parameter (subject to the clicked button);
    - **_result_** - (*boolean*) - result of the clicked button: **true** for "OK", **false** for "Cancel".


For additional details about supported configuration options of a confirm message box, see the desktop/message_boxes.md article.


@relatedapi:
- api/gantt_alert.md
- api/gantt_message.md
- api/gantt_modalbox.md

@related:desktop/message_boxes.md
@changelog:
added in version 4.0