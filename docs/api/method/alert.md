---
sidebar_label: alert
title: alert method
description: "calls an alert message box"
---

# alert

### Description

@short: Calls an alert message box

@signature: alert: (config: AlertBoxConfig | string | number) =\> HTMLElement

### Parameters

- `config` - (required) *AlertBoxConfig | string | number* -            either an object with the alert box's configuration or the text to show

### Returns
- ` div` - (HTMLElement) - the div container of the alert box

### Example

~~~jsx
var box = gantt.alert({
    title:"Alert",
    type:"alert-error",
    text:"You can't do this"
});

// or
var box = gantt.alert("This is an alert box");
~~~

### Details

The configuration object uses the following properties:

- **id?** - (*number | string*) - optional, the ID of the alert box
- **text** - (*number | string*) - the text of the alert box's body
- **title?** - (*number | string*) - optional, the text of the header
- **ok?** - (*number | string*) - optional, the text of the "OK" button
- **position?** - (*string*) - optional, the position of the alert box for now supports only one value - "top", any other value will result in "center-align"
- **width?** - (*string*) - optional, the width of the alert box (set as CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) or
  [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) values, e.g. "100px", "50%")
- **height?** - (*string*) - optional, the height of the alert box (set as CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) or
  [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) values, e.g. "100px", "50%")
- **callback? (result): void** - optional, the function called on button click. Takes *true* as a parameter (subject to the clicked button)
    - **_result_** - (*boolean*) - result of the clicked button, always returns **true** (because there is only the "OK" button)


For additional details about supported configuration options of an alert message box, see the [Popup Messages and Modal Boxes](guides/message-boxes.md) article.

### Related API
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [Popup Messages and Modal Boxes](guides/message-boxes.md)

### Change log
- added in version 4.0

