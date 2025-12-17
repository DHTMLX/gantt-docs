---
sidebar_label: onBeforeTaskDisplay
title: onBeforeTaskDisplay event
description: "fires after the tasks have been loaded to the Gantt chart, but before they are displayed"
---

# onBeforeTaskDisplay

### Description

@short: Fires after the tasks have been loaded to the Gantt chart, but before they are displayed

@signature: onBeforeTaskDisplay: (id: string | number, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - the task id
- `task` - (required) *Task* - the task object

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
    if (task.priority == "high"){
        return true;
    }
    return false;
});
~~~

### Details

The event is blockable. Returning false will prevent the task from being displayed

### Related API
- [onBeforeLinkDisplay](api/event/onbeforelinkdisplay.md)

### Related Guides
- [Filtering Tasks](guides/filtering.md)

