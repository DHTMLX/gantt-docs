---
sidebar_label: modalbox
title: modalbox method
description: "calls a modalbox"
---

# modalbox

### Description

@short: Calls a modalbox

@signature: modalbox: (config: ModalBoxConfig) =\> HTMLElement

### Parameters

- `config` - (required) *ModalBoxConfig* - the modal box's configuration

### Returns
- ` div` - (HTMLElement) - the div container of the modalbox

### Example

~~~jsx
let box = gantt.modalbox({
    title: "Close",
     type: "alert-warning"
});
~~~

### Details

The configuration object uses the following properties:

- **id?** - (*number | string*) - optional, the ID of the modal box
- **text** - (*number | string*) - the text of the modal box's body
- **title?** - (*number | string*) - optional, the text of the header
- **position?** - (*string*) - optional, the position of the modal box for now supports only one value - "top", any other value will result in "center-align"
- **buttons** - (*string[] | number[] | ModalboxButton[]*) - the array of buttons
- **width?** - (*string*) - optional, the width of the modal box (set as CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) or
  [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) values, e.g. "100px", "50%")
- **height?** - (*string*) - optional, the height of the modal box (set as CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) or
  [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) values, e.g. "100px", "50%")
- **callback? (result): void** - optional, the function called on button click. Takes *true* or *false* as a parameter (subject to the clicked button)
    - **_result_** - (*string | number | boolean*) - The result of the callback function will be equal to the stringified index of a pressed button from the array ("0", "1", "2",...)


The ModalboxButton has the following types:

- **label** - (*string | number*) - the text of the button
- **value?** - (*string | number | boolean*) - optional, the value that is returned in the *result* argument of the *callback* function.
- **css?** - (*string | number*) - optional, a custom class name for the button, prefixed with the "gantt_" string.


For additional details about supported configuration options of a modalbox, see the [Popup Messages and Modal Boxes](guides/message-boxes.md) article.

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)

### Related Guides
- [Popup Messages and Modal Boxes](guides/message-boxes.md)

### Change log
- added in version 4.0

