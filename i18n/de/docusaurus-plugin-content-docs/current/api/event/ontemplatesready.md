---
sidebar_label: onTemplatesReady
title: onTemplatesReady event
description: "wird ausgelöst, wenn die dhtmlxGantt Templates initialisiert wurden"
---

# onTemplatesReady

### Description

@short: Wird ausgelöst, wenn die dhtmlxGantt Templates initialisiert wurden

@signature: onTemplatesReady: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onTemplatesReady", function(){
    //hier benutzerdefinierte Logik einfügen
});
~~~

### Details

Dieses Event signalisiert, dass die dhtmlxGantt Templates vollständig initialisiert sind. Es bietet einen günstigen Zeitpunkt, um eine benutzerdefinierte Ansicht einzurichten.

Wenn der Code zur Erstellung der benutzerdefinierten Ansicht im onTemplatesReady Event-Handler platziert wird, stellt dies sicher, dass die Templates der Ansicht vorbereitet sind, bevor das Grid initialisiert wird. Dadurch wird gewährleistet, dass die benutzerdefinierte Ansicht korrekt auf der Seite angezeigt wird.
