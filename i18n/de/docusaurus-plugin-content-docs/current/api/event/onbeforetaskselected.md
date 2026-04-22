---
sidebar_label: onBeforeTaskSelected
title: onBeforeTaskSelected Ereignis
description: "Wird ausgelöst, bevor der Benutzer eine Aufgabe auswählt"
---

# onBeforeTaskSelected

### Description

@short: Wird ausgelöst, bevor der Benutzer eine Aufgabe auswählt

@signature: onBeforeTaskSelected: (id: string | number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - die Aufgaben-ID

### Returns
- `result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (true) oder abgebrochen wird (false)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskSelected", function(id){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
    return true;
});
~~~

### Details

Das Event kann blockiert werden. Geben Sie *false* zurück, um die Standardverarbeitung abzubrechen.

### Related API
- [onTaskSelected](api/event/ontaskselected.md)
- [onTaskUnselected](api/event/ontaskunselected.md)