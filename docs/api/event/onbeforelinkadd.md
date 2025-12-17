---
sidebar_label: onBeforeLinkAdd
title: onBeforeLinkAdd event
description: "fires before a new link is added to the Gantt chart"
---

# onBeforeLinkAdd

### Description

@short: Fires before a new link is added to the Gantt chart

@signature: onBeforeLinkAdd: (id: string | number, link: Link) =\> boolean;

### Parameters

- `id` - (required) *string | number* - the link id
- `link` - (required) *Link* - the link object

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeLinkAdd", function(id,link){
    //any custom logic here
    return true;
});
~~~

### Details

The event is blockable. Return *false* to cancel adding of the link.

~~~js
//excludes overtaking the target task by the source task
//in case of creating "finish_to_start" links
gantt.attachEvent("onBeforeLinkAdd", function(id, link){
    if (link.type == 0){
        var sourceTask = gantt.getTask(link.source);
        var targetTask = gantt.getTask(link.target);
        if (sourceTask.end_date >= targetTask.start_date){
            alert("This link is illegal")
            return false;
        }
    }
});
~~~

### Related API
- [addLink](api/method/addlink.md)

