---
sidebar_label: onMultiSelect
title: onMultiSelect-Ereignis
description: "wird ausgelöst, nachdem eine Aufgabe oder ein Bereich von Aufgaben ausgewählt wurde"
---

# onMultiSelect

### Description

@short: Wird ausgelöst, nachdem die Auswahl einer Aufgabe oder eines Aufgabenbereichs abgeschlossen wurde

@signature: onMultiSelect: (e: Event) =\> void;

### Parameters

- `e` - (erforderlich) *Event* - ein natives Event-Objekt

### Example

~~~jsx
gantt.attachEvent("onMultiSelect", function(e){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
    return true;
});
~~~

### Details

:::note
Dieses Ereignis ist in der **multiselect**-Erweiterung definiert, daher müssen Sie das [multiselect](guides/extensions-list.md#multitaskselection)-Plugin aktivieren. Lesen Sie die Details im Artikel [Multi-Task Selection](guides/multiselection.md).
:::

### Related API
- [onBeforeMultiSelect](api/event/onbeforemultiselect.md)
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md)
- [onTaskMultiSelect](api/event/ontaskmultiselect.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md#apievents)