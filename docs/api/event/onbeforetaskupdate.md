---
sidebar_label: onBeforeTaskUpdate
title: onBeforeTaskUpdate event
description: "fires before the user updates a task"
---

# onBeforeTaskUpdate

### Description

@short: Fires before the user updates a task

@signature: onBeforeTaskUpdate: (id: string | number, new_task: Task) =\> void;

### Parameters

- `id` - (required) *string | number* - the task id
- `new_task` - (required) *Task* - the new (updated) object of the task

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskUpdate", function(id,new_task){
    //any custom logic here
});
~~~

### Details

While using the **onBeforeTaskUpdate** event, it is not always possible to get the object of the task before the task is completely updated. The event fires after the task object has been updated but before all changes have been applied.
To get the task object before the changes are applied, you need to use the event handlers which are directly related to the changes of the task:

- [onLightboxSave](api/event/onlightboxsave.md)
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- [Inline Editors Extension](guides/inline-editors-ext.md#events)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onRowDragStart](api/event/onrowdragstart.md)

If the changes are made via API, you may get the task object before the code, which modifies the task, is executed. Check the example where you may modify a task in different ways (for instance, change the task dates):

:::note
sample: [Updating a task ](https://snippet.dhtmlx.com/9xy8wr2a)
:::

After comparison, you will notice that the events, which fire right before you modify the task, return the old task object, while the **onBeforeTaskUpdate** event returns a new object of the task.

### Related API
- [updateTask](api/method/updatetask.md)
- [onAfterTaskUpdate](api/event/onaftertaskupdate.md)

