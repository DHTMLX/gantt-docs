---
sidebar_label: onBeforeTaskDisplay
title: onBeforeTaskDisplay event
description: "wird direkt ausgelöst, nachdem Aufgaben in das Gantt-Diagramm geladen wurden, jedoch bevor sie angezeigt werden"
---

# onBeforeTaskDisplay

### Description

@short: Wird direkt ausgelöst, nachdem Aufgaben in das Gantt-Diagramm geladen wurden, jedoch bevor sie angezeigt werden

@signature: onBeforeTaskDisplay: (id: string | number, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - die ID der Aufgabe
- `task` - (required) *Task* - das Aufgabenobjekt

### Returns
- ` result` - (boolean) - steuert, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
    if (task.priority == "high"){
        return true;
    }
    return false;
});
~~~

### Details

Dieses Event kann blockiert werden. Wenn false zurückgegeben wird, wird die Aufgabe nicht im Diagramm angezeigt.

### Related API
- [onBeforeLinkDisplay](api/event/onbeforelinkdisplay.md)

### Related Guides
- ["Aufgaben filtern"](guides/filtering.md)

