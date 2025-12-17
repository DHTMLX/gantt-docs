---
sidebar_label: onBeforeMultiSelect
title: onBeforeMultiSelect event
description: "fires before selecting a task or a range of tasks"
---

# onBeforeMultiSelect

### Description

@short: Fires before selecting a task or a range of tasks

@signature: onBeforeMultiSelect: (e: Event) =\> void;

### Parameters

- `e` - (required) *Event* - a native event object

### Example

~~~jsx
gantt.attachEvent("onBeforeMultiSelect", function(e){
    // some logic here
    return true;
});
~~~

### Details

:::note
This event is defined in the **multiselect** extension, so you need to activate the [multiselect](guides/extensions-list.md#multitaskselection) plugin. Read the details in the [Multi-Task Selection](guides/multiselection.md) article. 
:::


The event is blockable, returning *false* will cancel multiple selection of tasks.

### Related API
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md)
- [onTaskMultiSelect](api/event/ontaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md#apievents)

