---
sidebar_label: onLinkDblClick
title: onLinkDblClick event
description: "fires when the user double clicks on a link"
---

# onLinkDblClick

### Description

@short: Fires when the user double clicks on a link

@signature: onLinkDblClick: (id: string | number, e?: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - the id of the clicked link

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onLinkDblClick", function(id,e){
    //any custom logic here
    return true;
});
~~~

### Details

The event is blockable. Returning false will cancel the default handler (deleting a link)

### Related API
- [onLinkClick](api/event/onlinkclick.md)

