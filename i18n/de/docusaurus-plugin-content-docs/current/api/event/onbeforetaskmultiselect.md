---
sidebar_label: onBeforeTaskMultiSelect
title: onBeforeTaskMultiSelect event
description: "Wird unmittelbar ausgelöst, bevor sich der Auswahlstatus einer Aufgabe ändert (wenn eine Aufgabe ausgewählt oder abgewählt wird)."
---

# onBeforeTaskMultiSelect

### Description

@short: Wird unmittelbar ausgelöst, bevor sich der Auswahlstatus einer Aufgabe ändert (wenn eine Aufgabe ausgewählt oder abgewählt wird).

@signature: onBeforeTaskMultiSelect: (id: string | number, state: boolean, e: Event | null) =\> void;

### Parameters

- `id` - (required) *string | number* - die eindeutige Kennung einer Aufgabe  
- `state` - (required) *boolean* - true, wenn die Aufgabe ausgewählt wird, false, wenn sie abgewählt wird  
- `e` - (required) *Event | null* - das native Event-Objekt, falls vorhanden

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskMultiSelect", function(id, state, e){  
    // hier Ihre Logik hinzufügen  
    return true;  
});
~~~

### Details

:::note
 Dieses Event ist Teil der **multiselect**-Erweiterung, daher stellen Sie sicher, dass das [multiselect](guides/extensions-list.md#multitaskselection) Plugin aktiviert ist. Weitere Details finden Sie im Artikel ["Multi-Task-Auswahl"](guides/multiselection.md). 
::: 

Dieses Event wird für jede Aufgabe innerhalb des Auswahlbereichs ausgelöst. 

Es kann durch Rückgabe von false blockiert werden, wodurch verhindert wird, dass sich der Auswahlstatus der Aufgabe ändert.

### Related API
- [onBeforeMultiSelect](api/event/onbeforemultiselect.md)
- [onTaskMultiSelect](api/event/ontaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- ["Multi-Task-Auswahl"](guides/multiselection.md#apievents)

