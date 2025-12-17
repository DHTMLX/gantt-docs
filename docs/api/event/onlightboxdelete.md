---
sidebar_label: onLightboxDelete
title: onLightboxDelete event
description: "fires when the user clicks on the 'Delete' button in the lightbox"
---

# onLightboxDelete

### Description

@short: Fires when the user clicks on the 'Delete' button in the lightbox

@signature: onLightboxDelete: (id: string | number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - the task id (the task opened in the lightbox)

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onLightboxDelete", function(id){
    const task = gantt.getTask(id);
    if (task.duration > 60){
        alert("The duration is too long. Please, try again");
        return false;
    }
    return true;
})
~~~

### Details

The event is blockable. Return *false* to cancel the 'delete' operation and keep the lightbox open.

### Related Guides
- [onLightboxCancel](api/event/onlightboxcancel.md)
- [onLightboxSave](api/event/onlightboxsave.md)

