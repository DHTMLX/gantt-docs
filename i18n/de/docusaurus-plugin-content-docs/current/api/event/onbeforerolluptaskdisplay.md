---
sidebar_label: onBeforeRollupTaskDisplay
title: onBeforeRollupTaskDisplay event
description: "Wird ausgelöst, kurz bevor die Rollup-Task im übergeordneten Projekt angezeigt wird"
---

# onBeforeRollupTaskDisplay

### Description

@short: Wird ausgelöst, kurz bevor die Rollup-Task im übergeordneten Projekt angezeigt wird

@signature: onBeforeRollupTaskDisplay: (taskId: number | string, task: Task, parentId: number | string) =\> boolean;

### Parameters

- `taskId` - (required) *number | string* - Die ID der Rollup-Task
- `task` - (required) *Task* - Das Rollup-Task-Objekt selbst
- `parentId` - (required) *number | string* - Die ID der übergeordneten (Projekt-)Task

### Returns
- ` result` - (boolean) - Gibt an, ob die Rollup-Task im übergeordneten Projekt sichtbar ist (<b>true</b>) oder verborgen bleibt (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeRollupTaskDisplay", function(taskId, task, parentId){
    // beliebige benutzerdefinierte Logik hier
    return false;
});
~~~

### Related Guides
- ["Meilensteine"](guides/milestones.md#rolluptasksandmilestones)

### Change log
- hinzugefügt in v8.0
