---
sidebar_label: onDataProcessorReady
title: onDataProcessorReady event
description: "ausgelöst, wenn `dp.init(gantt)` aufgerufen wird"
---

# onDataProcessorReady

### Description

@short: Ausgelöst, wenn `dp.init(gantt)` aufgerufen wird

@signature: onDataProcessorReady: (DataProcessor: any) =\> void;

### Parameters

- `DataProcessor` - (required) *object* - die DataProcessor-Instanz

### Example

~~~jsx
gantt.attachEvent("onDataProcessorReady",function(DataProcessor){
    // hier können Sie Ihre eigene Logik platzieren
});
~~~

### Details

Dieses Event ermöglicht es Ihnen, Handler direkt aus Ihrem Anwendungscode am DataProcessor anzuhängen.

### Related Guides
- ["Serverseitige Integration"](guides/server-side.md)
