---
sidebar_label: onLightboxSave
title: onLightboxSave event
description: "fires when the user clicks on the 'Save' button in the lightbox"
---

# onLightboxSave

### Description

@short: Fires when the user clicks on the 'Save' button in the lightbox

@signature: onLightboxSave: (id: string | number, task: Task, is_new: boolean) =\> boolean;

### Parameters

- `id` - (required) *string | number* - the id of unmodified task. Note, at this stage the lightbox values aren't applied to the task object yet and you can access the initial task using gantt.getTask(id)
- `task` - (required) *Task* - the modified task object
- `is_new` - (required) *boolean* - specifies whether the user opens the lightbox to create a new task (<i>true</i>)<br/> or update an existing one (<i>false</i>)

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onLightboxSave", function(id, task, is_new){
    //any custom logic here
    return true;
})
~~~

### Details

The event is blockable. Return *false* to cancel the 'save' operation and keep the lightbox open.

### Related Guides
- [onLightboxCancel](api/event/onlightboxcancel.md)
- [onLightboxDelete](api/event/onlightboxdelete.md)

