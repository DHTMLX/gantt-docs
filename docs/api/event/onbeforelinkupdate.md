---
sidebar_label: onBeforeLinkUpdate
title: onBeforeLinkUpdate event
description: "fires before a link is updated"
---

# onBeforeLinkUpdate

### Description

@short: Fires before a link is updated

@signature: onBeforeLinkUpdate: (id: string | number, new_link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - the link id
- `new_link` - (required) *Link* - the new (updated)  object of the link

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkUpdate", function(id,new_link){
    //any custom logic here
    return true;
});
~~~

### Details

The event is blockable. Return false to cancel updating of the link.

### Related API
- [updateLink](api/method/updatelink.md)
- [onAfterLinkUpdate](api/event/onafterlinkupdate.md)

