---
sidebar_label: onTaskMultiSelect
title: onTaskMultiSelect event
description: "fires after the task selection state has changed (the task has been selected/unselected)"
---

# onTaskMultiSelect

### Description

@short: Fires after the task selection state has changed (the task has been selected/unselected)

@signature: onTaskMultiSelect: (id: string | number, state: boolean, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - the id of a task
- `state` - (required) *boolean* - true if the task has been selected, false - if unselected
- `e` - (required) *Event* - a native event object

### Example

~~~jsx
gantt.attachEvent("onTaskMultiSelect", function(id, state, e){
    // some logic here
});
~~~

### Details

:::note
This event is defined in the **multiselect** extension, so you need to activate the [multiselect](guides/extensions-list.md#multitaskselection) plugin. Read the details in the [Multi-Task Selection](guides/multiselection.md) article. 
:::

The event is called for each task of the range.

### Related API
- [onBeforeMultiSelect](api/event/onbeforemultiselect.md)
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md#apievents)

