---
sidebar_label: onTemplatesReady
title: onTemplatesReady-Ereignis
description: "Wird ausgelöst, wenn die dhtmlxGantt-Templates initialisiert werden"
---

# onTemplatesReady

### Description

@short: Wird ausgelöst, sobald die dhtmlxGantt-Templates initialisiert werden

@signature: onTemplatesReady: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onTemplatesReady", function(){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Details

Das Ereignis signalisiert, dass die Templates von dhtmlxGantt bereit sind. Das Ereignis ist ein guter Zeitpunkt, um eine benutzerdefinierte Ansicht zu erstellen.

Es ist gute Praxis, den Code zur Erstellung der benutzerdefinierten Ansicht im Handler des onTemplatesReady-Ereignisses zu schreiben. Dadurch wird garantiert, dass die Templates der benutzerdefinierten Ansicht vor der Grid-Initialisierung bereit sind, und eine benutzerdefinierte Ansicht wird korrekt auf der Seite gerendert.