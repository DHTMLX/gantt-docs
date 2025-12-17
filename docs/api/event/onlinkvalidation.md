---
sidebar_label: onLinkValidation
title: onLinkValidation event
description: "fires when the user adds a new link and dhtmlxGantt checks whether the link is valid"
---

# onLinkValidation

### Description

@short: Fires when the user adds a new link and dhtmlxGantt checks whether the link is valid

@signature: onLinkValidation: (link: Link) =\> boolean;

### Parameters

- `link` - (required) *Link* - the link object

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or cancelled (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onLinkValidation", function(link){
    //any custom logic here
});
~~~

### Details

:::note
The event fires in the [isLinkAllowed](api/method/islinkallowed.md) method. 
:::

The event fires when a user creates a new link between tasks by drag-and-drop with the mouse.

If the event handler returns `false`, the round handler of the target task will be colored in red and the link won't be added. Returning `true`
will highlight the round handler in orange and allow creation of a link.

### Related API
- [isLinkAllowed](api/method/islinkallowed.md)

