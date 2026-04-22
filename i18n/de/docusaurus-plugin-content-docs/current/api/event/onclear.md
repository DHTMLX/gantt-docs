---
sidebar_label: onClear
title: onClear-Ereignis
description: "wird ausgelöst, nachdem alle Aufgaben aus dem Gantt-Diagramm durch die [clearAll](api/method/clearall.md) Methode entfernt wurden"
---

# onClear

### Description

@short: Wird ausgelöst, nachdem alle Aufgaben aus dem Gantt-Diagramm durch die [clearAll](api/method/clearall.md) Methode entfernt wurden

@signature: onClear: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onClear", function (){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related API
- [clearAll](api/method/clearall.md)