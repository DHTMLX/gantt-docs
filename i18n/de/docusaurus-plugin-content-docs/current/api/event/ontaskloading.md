---
sidebar_label: onTaskLoading
title: onTaskLoading event
description: "Wird ausgelöst, wenn eine Aufgabe aus der Datenquelle geladen wird."
---

# onTaskLoading

### Description

@short: Wird ausgelöst, wenn eine Aufgabe aus der Datenquelle geladen wird.

@signature: onTaskLoading: (task: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - das zu ladende Aufgabenobjekt

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder gestoppt wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onTaskLoading", function(task){
    // benutzerdefinierte Logik kann hier hinzugefügt werden
    return true;
});
~~~

### Details

- Dieses Event tritt für jede Aufgabe auf, die aus der Datenquelle stammt.
- Es kann blockiert werden. Die Rückgabe von *false* verhindert, dass die Aufgabe in das Gantt-Diagramm geladen wird.

### Related API
- [onLoadStart](api/event/onloadstart.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)
- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onDataRender](api/event/ondatarender.md)
- [onGanttRender](api/event/onganttrender.md)
- [onLoadEnd](api/event/onloadend.md)

