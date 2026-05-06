---
sidebar_label: onTaskMultiSelect
title: onTaskMultiSelect Ereignis
description: "Wird ausgelöst, nachdem der Auswahlstatus der Aufgabe geändert wurde (die Aufgabe wurde ausgewählt bzw. abgewählt)"
---

# onTaskMultiSelect

### Description

@short: Wird ausgelöst, nachdem der Auswahlstatus der Aufgabe geändert wurde (die Aufgabe wurde ausgewählt bzw. abgewählt)

@signature: onTaskMultiSelect: (id: string | number, state: boolean, e: Event) =\> void;

### Parameters

- `id` - (erforderlich) *string | number* - die ID einer Aufgabe
- `state` - (erforderlich) *boolean* - true, falls die Aufgabe ausgewählt wurde, false - falls sie abgewählt wurde
- `e` - (erforderlich) *Event* - ein natives Event-Objekt

### Example

~~~jsx
gantt.attachEvent("onTaskMultiSelect", function(id, state, e){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Details

:::note
Dieses Event ist in der **Multiselect-Erweiterung** definiert, daher müssen Sie das [Multiselect]-Plugin aktivieren. Lesen Sie die Details im Artikel [Multi-Task Selection](guides/multiselection.md).
:::

Das Event wird für jede Aufgabe im Bereich aufgerufen.

### Related API
- [onBeforeMultiSelect](api/event/onbeforemultiselect.md)
- [onBeforeTaskMultiSelect](api/event/onbeforetaskmultiselect.md)
- [onMultiSelect](api/event/onmultiselect.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md#apievents)