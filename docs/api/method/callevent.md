---
sidebar_label: callEvent
title: callEvent method
description: "calls an inner event"
---

# callEvent

### Description

@short: Calls an inner event

@signature: callEvent: (name: string, params?: any[]) =\> boolean

### Parameters

- `name` - (required) *string* - the event's name, case-insensitive
- `params` - (optional) *array* - an array of the event-related data

### Returns
- ` result` - (boolean) - <i>false</i>, if some of the event handlers returns <i>false</i>. Otherwise, <i>true</i>

### Example

~~~jsx
gantt.attachEvent("CustomEvent", function(param1, param2){
    return true;
});

var res = gantt.callEvent("CustomEvent", [param1, param2]);
~~~

### Details

Normally, events are called automatically and you don't need to use this method.
