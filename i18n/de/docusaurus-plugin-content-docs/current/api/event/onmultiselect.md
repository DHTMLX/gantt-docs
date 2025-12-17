---
sidebar_label: onMultiSelect
title: onMultiSelect event
description: "Löst aus, sobald die Auswahl einer Aufgabe oder mehrerer Aufgaben abgeschlossen ist"
---

# onMultiSelect

### Description

@short: Löst aus, sobald die Auswahl einer Aufgabe oder mehrerer Aufgaben abgeschlossen ist

@signature: onMultiSelect: (e: Event) =\> void;

### Parameters

- `e` - (required) *Event* - ein natives Event-Objekt

### Example

~~~jsx
gantt.attachEvent("onMultiSelect", function(e){
    // some logic here
    return true;
});
~~~

### Details

:::note
 Dieses Event ist Teil der **multiselect** Erweiterung, daher stellen Sie sicher, dass das [multiselect](guides/extensions-list.md#multitaskselection) Plugin aktiviert ist. Für weitere Details lesen Sie den Artikel ["Multi-Task-Auswahl"](guides/multiselection.md). 
:::

### Related API
- [onBeforeMultiSelect](api/event/onbeforemultiselect.md)
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md)
- [onTaskMultiSelect](api/event/ontaskmultiselect.md)

### Related Guides
- ["Multi-Task-Auswahl"](guides/multiselection.md#apievents)

