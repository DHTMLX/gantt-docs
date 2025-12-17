---
sidebar_label: onDestroy
title: onDestroy event
description: "wird ausgelöst, sobald das Gantt-Diagramm mit der Methode destructor gelöscht wurde"
---

# onDestroy

### Description

@short: Wird ausgelöst, sobald das Gantt-Diagramm mit der Methode [destructor](api/method/destructor.md) gelöscht wurde

@signature: onDestroy: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onDestroy", function(){
   alert("freie benutzerdefinierte Ressourcen");
});

gantt.destructor();
~~~

### Related API
- [destructor](api/method/destructor.md)

