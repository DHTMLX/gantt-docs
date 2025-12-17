---
sidebar_label: onDataProcessorReady
title: onDataProcessorReady event
description: "fires on the `dp.init(gantt)` call"
---

# onDataProcessorReady

### Description

@short: Fires on the `dp.init(gantt)` call

@signature: onDataProcessorReady: (DataProcessor: any) =\> void;

### Parameters

- `DataProcessor` - (required) *object* - the DataProcessor object

### Example

~~~jsx
gantt.attachEvent("onDataProcessorReady",function(DataProcessor){
    // any custom logic here
});
~~~

### Details

You can use this event to add handlers for DataProcessor from the app code.

### Related Guides
- [Server-Side Integration](guides/server-side.md)
