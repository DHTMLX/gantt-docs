---
sidebar_label: onTaskUnselected
title: onTaskUnselected event
description: "Wird ausgelöst, wenn ein Benutzer eine Aufgabe durch Auswahl einer anderen deselektiert."
---

# onTaskUnselected

### Description

@short: Wird ausgelöst, wenn ein Benutzer eine Aufgabe durch Auswahl einer anderen deselektiert.

@signature: onTaskUnselected: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - die ID der Aufgabe, die deselektiert wurde

### Example

~~~jsx
gantt.attachEvent("onTaskUnselected", function(id){
    // benutzerdefinierte Logik kann hier eingefügt werden
});
~~~

### Details

Dieses Event tritt für jede Aufgabe innerhalb des Multiselectionsbereichs auf.

Wenn die [multiselect](guides/extensions-list.md#multitaskselection) Extension aktiv ist, wird es ebenfalls ausgelöst, wenn ein Benutzer eine Aufgabe aus der aktuellen Auswahl entfernt.

### Related API
- [onBeforeTaskSelected](api/event/onbeforetaskselected.md)
- [onTaskSelected](api/event/ontaskselected.md)

