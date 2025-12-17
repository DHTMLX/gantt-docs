---
sidebar_label: onLightboxButton
title: onLightboxButton event
description: "fires when the user clicks on a custom button in the lightbox"
---

# onLightboxButton

### Description

@short: Fires when the user clicks on a custom button in the lightbox

@signature: onLightboxButton: (css: string, node: HTMLElement, e: Event) =\> void;

### Parameters

- `css` - (required) *string* - the name of the CSS class applied to the button
- `node` - (required) *HTMLElement* - an HTML element of the clicked button
- `e` - (required) *Event* - a native 'click' event object

### Example

~~~jsx
gantt.attachEvent("onLightboxButton", function (css, node, e){
    //any custom logic here
});
~~~

### Details

The event fires only for custom buttons at the bottom of the lightbox and doesn't fire
for the default buttons.
