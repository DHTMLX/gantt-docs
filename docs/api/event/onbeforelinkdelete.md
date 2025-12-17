---
sidebar_label: onBeforeLinkDelete
title: onBeforeLinkDelete event
description: "fires before the user deletes a link"
---

# onBeforeLinkDelete

### Description

@short: Fires before the user deletes a link

@signature: onBeforeLinkDelete: (id: string | number, link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - the link id
- `link` - (required) *Link* - the link object

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>) 

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkDelete", function(id,link){
    //any custom logic here
    return true;
});
~~~

### Details

The event is blockable. Return false to cancel deleting of the link.

### Related API
- [deleteLink](api/method/deletelink.md)

