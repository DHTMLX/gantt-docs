---
sidebar_label: onBeforeLinkDisplay
title: onBeforeLinkDisplay event
description: "fires after the links have been loaded to the Gantt chart but before they are displayed"
---

# onBeforeLinkDisplay

### Description

@short: Fires after the links have been loaded to the Gantt chart but before they are displayed

@signature: onBeforeLinkDisplay: (id: string | number, link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - the link id
- `link` - (required) *Link* - the link object

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkDisplay", function(id, link){
    if (link.type == gantt.config.links.finish_to_start){
        return true;
    }
    return false;
});
~~~

### Details

The event is blockable. Returning false will prevent the link from being displayed

### Related API
- [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md)

