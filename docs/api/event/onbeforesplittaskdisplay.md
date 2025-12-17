---
sidebar_label: onBeforeSplitTaskDisplay
title: onBeforeSplitTaskDisplay event
description: "fires before a part of the split task is displayed on the Gantt chart"
---

# onBeforeSplitTaskDisplay

### Description

@short: Fires before a part of the split task is displayed on the Gantt chart

@signature: onBeforeSplitTaskDisplay: (id: number | string, task: Task, parent: any) =\> boolean;

### Parameters

- `id` - (required) *number | string* - the id of the subtask
- `task` - (required) *Task* - the object of the subtask
- `parent` - (required) *object* - the object of the parent task

### Returns
- ` result` - (boolean) - defines whether the subtask of the split task will be displayed on the page (<b>true</b>) or not (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeSplitTaskDisplay", function (id, task, parent) {
    if (task.duration < 3) {
        return false;
    }
    return true;
});
~~~

### Details

![split tasks](/img/split_tasks.png)

When the split task is rendered, firstly the [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) event is fired for the parent item (a task with *render:"split"*). Then "onBeforeSplitTaskDisplay" is fired for its every subtask. Returning *false* from "onBeforeSplitTaskDisplay" prevents a subtask from being displayed.

:::note
sample: [Filter split tasks ](https://snippet.dhtmlx.com/3q1yd7iz)
:::

### Related Guides
- [Split Tasks](/guides/split-tasks/)

### Change log
- added in v8.0

