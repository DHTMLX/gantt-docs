---
sidebar_label: onTaskUnselected
title: onTaskUnselected event
description: "fires when the user unselects a task by selecting some other task"
---

# onTaskUnselected

### Description

@short: Fires when the user unselects a task by selecting some other task

@signature: onTaskUnselected: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - the task id (of the unselected task)

### Example

~~~jsx
gantt.attachEvent("onTaskUnselected", function(id){
    //any custom logic here
});
~~~

### Details

The event is called for each task of the multiselection range.

If the [multiselect](guides/extensions-list.md#multitaskselection) extension is enabled, the event also fires when a user removes selection from the selected task.

### Related API
- [onBeforeTaskSelected](api/event/onbeforetaskselected.md)
- [onTaskSelected](api/event/ontaskselected.md)

