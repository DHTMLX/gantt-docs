---
sidebar_label: onTaskSelected
title: onTaskSelected event
description: "Wird ausgelöst, wenn ein Benutzer eine Aufgabe auswählt"
---

# onTaskSelected

### Description

@short: Wird ausgelöst, wenn ein Benutzer eine Aufgabe auswählt

@signature: onTaskSelected: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - die ID der Aufgabe

### Example

~~~jsx
gantt.attachEvent("onTaskSelected", function(id){
    //beliebige benutzerdefinierte Logik hier
});
~~~

### Details

Dieses Event wird für jede Aufgabe ausgelöst, die im Multiselectionsbereich enthalten ist.

### Related API
- [onBeforeTaskSelected](api/event/onbeforetaskselected.md)
- [onTaskUnselected](api/event/ontaskunselected.md)

