---
sidebar_label: silent
title: silent method
description: "Verhindert, dass durch den darin enthaltenen Code interne Events oder serverseitige Aufrufe ausgelöst werden."
---

# silent

### Description

@short: Verhindert, dass durch den darin enthaltenen Code interne Events oder serverseitige Aufrufe ausgelöst werden.

@signature: silent: (callback: GanttCallback) =\> void

### Parameters

- `callback` - (required) *function* - Die Callback-Funktion

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
- ["Serverseitige Integration"](guides/server-side.md#errorhandling)
