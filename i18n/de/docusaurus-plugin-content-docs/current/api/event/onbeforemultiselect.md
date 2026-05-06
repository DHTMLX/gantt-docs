---
sidebar_label: onBeforeMultiSelect
title: onBeforeMultiSelect Event
description: "Wird ausgelöst, bevor eine Aufgabe oder mehrere Aufgaben ausgewählt werden"
---

# onBeforeMultiSelect

### Description

@short: Wird ausgelöst, bevor eine Aufgabe oder mehrere Aufgaben ausgewählt werden

@signature: onBeforeMultiSelect: (e: Event) =\> void;

### Parameters

- `e` - (erforderlich) *Event* - ein natives Event-Objekt

### Example

~~~jsx
gantt.attachEvent("onBeforeMultiSelect", function(e){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
    return true;
});
~~~

### Details

:::note
Dieses Event ist in der **multiselect**-Erweiterung definiert, daher müssen Sie das [multiselect](guides/extensions-list.md#multitaskselection) Plugin aktivieren. Lesen Sie die Details im Artikel [Multi-Task Selection](guides/multiselection.md). 
:::

Dieses Event ist blockierbar; wird *false* zurückgegeben, wird die Mehrfachauswahl von Aufgaben abgebrochen.

### Related API
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md)
- [onTaskMultiSelect](api/event/ontaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- [Multi-Task-Auswahl](guides/multiselection.md#apievents)