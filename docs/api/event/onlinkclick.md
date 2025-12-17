---
sidebar_label: onLinkClick
title: onLinkClick event
description: "fires when the user clicks on a link"
---

# onLinkClick

### Description

@short: Fires when the user clicks on a link

@signature: onLinkClick: (id: string | number, e?: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - the id of the clicked link

### Example

~~~jsx
gantt.attachEvent("onLinkClick", function(id,e){
    //any custom logic here
});
~~~

### Related API
- [onLinkDblClick](api/event/onlinkdblclick.md)

