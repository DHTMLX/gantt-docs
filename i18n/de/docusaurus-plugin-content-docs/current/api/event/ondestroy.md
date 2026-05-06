---
sidebar_label: onDestroy
title: onDestroy Event
description: "Wird aufgerufen, nachdem Gantt durch die destructor-Methode bereinigt wurde"
---

# onDestroy

### Description

@short: Aufgerufen, nachdem Gantt durch die destructor-Methode bereinigt wurde

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