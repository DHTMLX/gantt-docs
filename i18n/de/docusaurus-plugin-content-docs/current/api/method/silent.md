---
sidebar_label: silent
title: silent method
description: "bewirkt, dass sämtlicher Code darin keine internen Ereignisse auslöst oder serverseitige Aufrufe tätigt"
---

# silent

### Description

@short: Stellt sicher, dass der gesamte Code darin keine internen Ereignisse auslöst oder serverseitige Aufrufe tätigt

@signature: silent: (callback: GanttCallback) =\> void

### Parameters

- `callback` - (erforderlich) *Funktion* - die Callback-Funktion

### Example

~~~jsx
gantt.silent(function () {
    // die Aufgabe wird nur auf der Client-Seite entfernt
    // das Gantt wird nicht automatisch neu gezeichnet
    gantt.deleteTask(id);
});

// das Gantt manuell neu zeichnen, wenn bereit
gantt.render();
~~~

### Related Guides
- [Serverseitige Integration](guides/server-side.md#error-handling)