---
sidebar_label: onTaskMultiSelect
title: onTaskMultiSelect event
description: "wird ausgelöst, sobald sich der Auswahlstatus einer Aufgabe ändert (wenn eine Aufgabe ausgewählt oder abgewählt wird)"
---

# onTaskMultiSelect

### Description

@short: Wird ausgelöst, sobald sich der Auswahlstatus einer Aufgabe ändert (wenn eine Aufgabe ausgewählt oder abgewählt wird)

@signature: onTaskMultiSelect: (id: string | number, state: boolean, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - die Kennung der Aufgabe
- `state` - (required) *boolean* - true, wenn die Aufgabe ausgewählt ist, false, wenn sie abgewählt ist
- `e` - (required) *Event* - das native Event-Objekt

### Example

~~~jsx
gantt.attachEvent("onTaskMultiSelect", function(id, state, e){
    // some logic here
});
~~~

### Details

:::note
 Dieses Event gehört zur **multiselect** Erweiterung, daher stellen Sie sicher, dass das [multiselect](guides/extensions-list.md#multitaskselection) Plugin aktiviert ist. Weitere Informationen finden Sie im Artikel ["Multi-Task-Auswahl"](guides/multiselection.md). 
:::


Dieses Event wird für jede Aufgabe im ausgewählten Bereich ausgelöst.

### Related API
- [onBeforeMultiSelect](api/event/onbeforemultiselect.md)
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- ["Multi-Task-Auswahl"](guides/multiselection.md#apievents)

