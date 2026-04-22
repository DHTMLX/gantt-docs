---
sidebar_label: onTaskUnselected
title: onTaskUnselected event
description: "Wird ausgelöst, wenn der Benutzer eine Aufgabe abwählt, indem er eine andere Aufgabe auswählt"
---

# onTaskUnselected

### Description

@short: Wird ausgelöst, wenn der Benutzer eine Aufgabe abwählt, indem er eine andere Aufgabe auswählt

@signature: onTaskUnselected: (id: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - die ID der abgewählten Aufgabe

### Example

~~~jsx
gantt.attachEvent("onTaskUnselected", function(id){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Details

Das Ereignis wird für jede Aufgabe im Bereich der Mehrfachauswahl aufgerufen.

Falls die Erweiterung [multiselect](guides/extensions-list.md#multitaskselection) aktiviert ist, wird das Ereignis auch ausgelöst, wenn der Benutzer die Auswahl von der ausgewählten Aufgabe entfernt.

### Related API
- [onBeforeTaskSelected](api/event/onbeforetaskselected.md)
- [onTaskSelected](api/event/ontaskselected.md)