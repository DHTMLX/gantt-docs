---
sidebar_label: onMultiSelect
title: onMultiSelect event
description: "fires after selection of a task or a range of tasks has been completed"
---

# onMultiSelect

### Description

@short: Fires after selection of a task or a range of tasks has been completed

@signature: onMultiSelect: (e: Event) =\> void;

### Parameters

- `e` - (required) *Event* - a native event object

### Example

~~~jsx
gantt.attachEvent("onMultiSelect", function(e){
    // some logic here
    return true;
});
~~~

### Details

:::note
This event is defined in the **multiselect** extension, so you need to activate the [multiselect](guides/extensions-list.md#multitaskselection) plugin. Read the details in the [Multi-Task Selection](guides/multiselection.md) article. 
:::

### Related API
- [onBeforeMultiSelect](api/event/onbeforemultiselect.md)
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md)
- [onTaskMultiSelect](api/event/ontaskmultiselect.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md#apievents)

