---
sidebar_label: onLinkCreated
title: onLinkCreated event
description: "fires when a user creates a new link between tasks"
---

# onLinkCreated

### Description

@short: Fires when a user creates a new link between tasks

@signature: onLinkCreated: (link: Link) =\> boolean;

### Parameters

- `link` - (required) *Link* - the object of a new link

### Returns
- ` result` - (boolean) - returning `false` will cancel the creation of a new link, returning `true` will continue the default processing

### Example

~~~jsx
gantt.attachEvent("onLinkCreated", function(link){
    // your code here
    return true;
});
~~~

### Details

The event fires before a new link is displayed, which allows you to **cancel the creation** of a link.

### Change log
- added in v6.2.2
