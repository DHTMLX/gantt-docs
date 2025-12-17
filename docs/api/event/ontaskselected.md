---
sidebar_label: onTaskSelected
title: onTaskSelected event
description: "fires when the user selects a task"
---

# onTaskSelected

### Description

@short: Fires when the user selects a task

@signature: onTaskSelected: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string,number* - the task id

### Example

~~~jsx
gantt.attachEvent("onTaskSelected", function(id){
    //any custom logic here
});
~~~

### Details

The event is called for each task of the multiselection range.

### Related API
- [onBeforeTaskSelected](api/event/onbeforetaskselected.md)
- [onTaskUnselected](api/event/ontaskunselected.md)

