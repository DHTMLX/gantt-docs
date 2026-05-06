---
sidebar_label: onDataProcessorReady
title: onDataProcessorReady event
description: "wird beim Aufruf von `dp.init(gantt)` ausgelöst"
---

# onDataProcessorReady

### Description

@short: Wird beim Aufruf von `dp.init(gantt)` ausgelöst

@signature: onDataProcessorReady: (DataProcessor: any) =\> void;

### Parameters

- `DataProcessor` - (erforderlich) *Objekt* - das DataProcessor-Objekt

### Example

~~~jsx
gantt.attachEvent("onDataProcessorReady",function(DataProcessor){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Details

Sie können dieses Ereignis verwenden, um Handler für DataProcessor aus dem App-Code hinzuzufügen.

### Related Guides
- [Serverseitige Integration](guides/server-side.md)