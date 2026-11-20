---
sidebar_label: onTaskFormRender
title: onTaskFormRender event
description: "Fires when the advanced task form opens or is rebuilt"
---

# onTaskFormRender

### Description

@short: Fires when the advanced task form opens or is rebuilt

@signature: onTaskFormRender: (taskId: string | number, api: TaskFormExt) =\> void

### Parameters

- `taskId` - the ID of the task being edited
- `api` - the advanced task form API, `gantt.ext.taskForm`

### Example

~~~js
gantt.attachEvent("onTaskFormRender", function (taskId, api) {
    console.log(taskId, api.getActiveTab());
});
~~~

### Details

Requires the [advanced task form](guides/advanced-task-form.md). The form is open and populated when the event fires. It also fires after an open form is rebuilt, for example when the user changes the task type.
