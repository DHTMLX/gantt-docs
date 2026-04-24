---
sidebar_label: onTaskLoading
title: onTaskLoading-Ereignis
description: "Wird ausgelöst, wenn eine Aufgabe aus der Datenquelle geladen wird"
---

# onTaskLoading

### Description

@short: Wird ausgelöst, wenn eine Aufgabe aus der Datenquelle geladen wird

@signature: onTaskLoading: (task: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - Das Objekt einer Aufgabe

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onTaskLoading", function(task){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
    return true;
});
~~~

### Details

- Das Event wird für jede Aufgabe in der Datenquelle ausgelöst.
- Das Event ist blockierbar. Geben Sie false zurück und die Aufgabe wird nicht in das Gantt-Diagramm geladen.

### Related API
- [onLoadStart](api/event/onloadstart.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)
- [onBeforeGanttRender](api/event/onbeforeganttrender.md)
- [onBeforeDataRender](api/event/onbeforedatarender.md)
- [onDataRender](api/event/ondatarender.md)
- [onGanttRender](api/event/onganttrender.md)
- [onLoadEnd](api/event/onloadend.md)