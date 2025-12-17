---
sidebar_label: confirm
title: confirm method
description: "calls a confirm message box"
---

# confirm

### Description

@short: Calls a confirm message box

@signature: confirm: (config: ConfirmBoxConfig | string | number) =\> HTMLElement

### Parameters

- `config` - (required) *ConfirmBoxConfig | string | number* -            either an object with the confirm box's configuration or the text to show

### Returns
- ` div` - (HTMLElement) - the div container of the confirm box

### Example

~~~jsx
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
~~~

### Details

The configuration object uses the following properties:

- **id?** - (*number | string*) - optional, the ID of the confirm box
- **text** - (*number | string*) - the text of the confirm box's body
- **title?** - (*number | string*) - optional, the text of the header
- **ok?** - (*number | string*) - optional, the text of the "OK" button
- **cancel?** - (*number | string*) - optional, the text of the "Cancel" button
- **position?** - (*string*) - optional, the position of the confirm box for now supports only one value - "top", any other value will result in "center-align"
- **width?** - (*string*) - optional, the width of the confirm box (set as CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) or
  [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) values, e.g. "100px", "50%")
- **height?** - (*string*) - optional, the height of the confirm box (set as CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) or
  [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) values, e.g. "100px", "50%")
- **callback? (result): void** - optional, the function called on button click. Takes *true* or *false* as a parameter (subject to the clicked button)
    - **_result_** - (*boolean*) - result of the clicked button: **true** for "OK", **false** for "Cancel".


For additional details about supported configuration options of a confirm message box, see the [Popup Messages and Modal Boxes](guides/message-boxes.md) article.

### Related API
- [alert](api/method/alert.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [Popup Messages and Modal Boxes](guides/message-boxes.md)

### Change log
- added in version 4.0

