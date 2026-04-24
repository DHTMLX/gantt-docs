---
sidebar_label: onBeforeRollupTaskDisplay
title: onBeforeRollupTaskDisplay Ereignis
description: "wird ausgelöst, bevor die Rollup-Aufgabe im übergeordneten Projekt angezeigt wird"
---

# onBeforeRollupTaskDisplay

### Description

@short: Wird ausgelöst, bevor die Rollup-Aufgabe im übergeordneten Projekt angezeigt wird

@signature: onBeforeRollupTaskDisplay: (taskId: number | string, task: Task, parentId: number | string) =\> boolean;

### Parameters

- `taskId` - (erforderlich) *number | string* - die Rollup-Aufgaben-ID
- `task` - (erforderlich) *Task* - das Rollup-Aufgaben-Objekt
- `parentId` - (erforderlich) *number | string* - die ID der übergeordneten (Projekt-)Aufgabe

### Returns
- ` result` - (boolean) - definiert, ob die Rollup-Aufgabe im übergeordneten Projekt angezeigt wird (<b>true</b>) oder nicht (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeRollupTaskDisplay", function(taskId, task, parentId){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
    return false;
});
~~~

### Related Guides
- [Milestones](guides/milestones.md#rolluptasksandmilestones)

### Change log
- hinzugefügt in v8.0