---
sidebar_label: onBeforeMultiSelect
title: onBeforeMultiSelect event
description: "Löst aus, kurz bevor eine oder mehrere Aufgaben ausgewählt werden"
---

# onBeforeMultiSelect

### Description

@short: Löst aus, kurz bevor eine oder mehrere Aufgaben ausgewählt werden

@signature: onBeforeMultiSelect: (e: Event) =\> void;

### Parameters

- `e` - (required) *Event* - das native Event-Objekt

### Example

~~~jsx
gantt.attachEvent("onBeforeMultiSelect", function(e){
    // some logic here
    return true;
});
~~~

### Details

:::note
note Dieses Event ist Teil der **multiselect**-Erweiterung, daher stellen Sie sicher, dass das [multiselect](guides/extensions-list.md#multitaskselection) Plugin aktiviert ist. Für weitere Details lesen Sie den Artikel ["Multi-Task-Auswahl"](guides/multiselection.md). 
:::


Dieses Event kann blockiert werden - wenn *false* zurückgegeben wird, wird die Mehrfachauswahl von Aufgaben verhindert.

### Related API
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md)
- [onTaskMultiSelect](api/event/ontaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- ["Multi-Task-Auswahl"](guides/multiselection.md#apievents)

