---
sidebar_label: onBeforeTaskDisplay
title: onBeforeTaskDisplay event
description: "Wird ausgelöst, nachdem die Aufgaben in das Gantt-Diagramm geladen wurden, aber bevor sie angezeigt werden"
---

# onBeforeTaskDisplay

### Description

@short: Wird ausgelöst, nachdem die Aufgaben in das Gantt-Diagramm geladen wurden, aber bevor sie angezeigt werden

@signature: onBeforeTaskDisplay: (id: string | number, task: Task) =\> boolean;

### Parameters

- `id` - (erforderlich) *string | number* - die Task-ID
- `task` - (erforderlich) *Task* - das Task-Objekt

### Returns
- ` result` - (boolean) - definiert, ob die Standardaktion des Events ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

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

Das Event ist blockierbar. Wenn false zurückgegeben wird, wird die Aufgabe nicht angezeigt.

### Related API
- [onBeforeLinkDisplay](api/event/onbeforelinkdisplay.md)

### Related Guides
- [Filtering Tasks](guides/filtering.md)