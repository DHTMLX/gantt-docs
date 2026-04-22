---
sidebar_label: onGanttReady
title: onGanttReady-Ereignis
description: "Löst aus, nachdem die dhtmlxGantt-Initialisierung abgeschlossen ist, aber das Gantt-Diagramm ist noch nicht auf der Seite gerendert"
---

# onGanttReady

### Description

@short: Wird ausgelöst, nachdem die dhtmlxGantt-Initialisierung abgeschlossen ist, das Gantt-Diagramm jedoch noch nicht auf der Seite gerendert wird

@signature: onGanttReady: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onGanttReady", function(){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related API
- [onBeforeGanttReady](api/event/onbeforeganttready.md)