---
sidebar_label: onBeforeTaskMultiSelect
title: onBeforeTaskMultiSelect event
description: "fires before the task selection state is being changed (the task is being selected or unselected)"
---

# onBeforeTaskMultiSelect

### Description

@short: Fires before the task selection state is being changed (the task is being selected or unselected)

@signature: onBeforeTaskMultiSelect: (id: string | number, state: boolean, e: Event | null) =\> void;

### Parameters

- `id` - (required) *string | number* - the id of a task
- `state` - (required) *boolean* - true if the task is going to be selected, false - if unselected
- `e` - (required) *Event | null* - a native event object

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskMultiSelect", function(id, state, e){
    // some logic here
     return true;
});
~~~

### Details

:::note
This event is defined in the **multiselect** extension, so you need to activate the [multiselect](guides/extensions-list.md#multitaskselection) plugin. Read the details in the [Multi-Task Selection](guides/multiselection.md) article. 
:::

The event is called for each task of the range.

The event is blockable, returning false will cancel the change of the task selection state.

### Related API
- [onBeforeMultiSelect](api/event/onbeforemultiselect.md)
- [onTaskMultiSelect](api/event/ontaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md#apievents)

