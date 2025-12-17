---
sidebar_label: onClear
title: onClear event
description: "Wird ausgelöst, sobald alle Aufgaben mithilfe der clearAll Methode aus dem Gantt-Diagramm entfernt wurden."
---

# onClear

### Description

@short: Wird ausgelöst, sobald alle Aufgaben mithilfe der [clearAll](api/method/clearall.md) Methode aus dem Gantt-Diagramm entfernt wurden.

@signature: onClear: () =\> void;

### Example

~~~jsx
gantt.attachEvent("onClear", function (){
    //beliebige benutzerdefinierte Logik hier
});
~~~

### Related API
- [clearAll](api/method/clearall.md)

