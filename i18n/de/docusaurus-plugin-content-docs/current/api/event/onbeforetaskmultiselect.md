---
sidebar_label: onBeforeTaskMultiSelect
title: onBeforeTaskMultiSelect-Ereignis
description: "wird ausgelöst, bevor der Status der Aufgaben-Auswahl geändert wird (die Aufgabe wird ausgewählt oder abgewählt)"
---

# onBeforeTaskMultiSelect

### Description

@short: Wird ausgelöst, bevor der Status der Task-Auswahl geändert wird (die Task wird ausgewählt oder abgewählt)

@signature: onBeforeTaskMultiSelect: (id: string | number, state: boolean, e: Event | null) =\> void;

### Parameters

- `id` - (erforderlich) *string | number* - die ID einer Aufgabe
- `state` - (erforderlich) *boolean* - true, wenn die Aufgabe ausgewählt wird; false, wenn sie abgewählt wird
- `e` - (erforderlich) *Event | null* - ein natives Event-Objekt

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskMultiSelect", function(id, state, e){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
     return true;
});
~~~

### Details

:::note
Dieses Event ist in der **Multiselect**-Erweiterung definiert, daher müssen Sie das [Multiselect](guides/extensions-list.md#multitaskselection) Plugin aktivieren. Lesen Sie die Details im Artikel [Multi-Task Selection](guides/multiselection.md).
:::

Das Event wird für jede Task im angegebenen Bereich aufgerufen.

Das Event kann blockiert werden; Wenn false zurückgegeben wird, wird die Änderung des Task-Auswahlstatus abgebrochen.

### Related API
- [onBeforeMultiSelect](api/event/onbeforemultiselect.md)
- [onTaskMultiSelect](api/event/ontaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md#apievents)