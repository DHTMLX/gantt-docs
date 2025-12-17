---
sidebar_label: onGanttReady
title: onGanttReady event
description: "Wird ausgelöst, sobald dhtmlxGantt die Initialisierung abgeschlossen hat, obwohl das Gantt-Diagramm selbst noch nicht auf der Seite angezeigt wird."
---

# onGanttReady

### Description

@short: Wird ausgelöst, sobald dhtmlxGantt die Initialisierung abgeschlossen hat, obwohl das Gantt-Diagramm selbst noch nicht auf der Seite angezeigt wird.

@signature: onGanttReady: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onGanttReady", function(){
    // Benutzerdefinierte Logik kann hier eingefügt werden
});
~~~

### Related API
- [onBeforeGanttReady](api/event/onbeforeganttready.md)

