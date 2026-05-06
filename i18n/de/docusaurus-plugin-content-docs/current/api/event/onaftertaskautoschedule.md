---
sidebar_label: onAfterTaskAutoSchedule
title: onAfterTaskAutoSchedule event
description: "Wird für jede Aufgabe ausgelöst, die automatisch geplant wurde"
--- 

# onAfterTaskAutoSchedule
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Wird für jede Aufgabe ausgelöst, die automatisch geplant wurde

@signature: onAfterTaskAutoSchedule: (task: Task, start: Date, link: Link, predecessor: Task) =\> void;

### Parameters

- `task` - (erforderlich) *Task* - das Task-Objekt
- `start` - (erforderlich) *Date* - ein neues Startdatum
- `link` - (erforderlich) *Link* - das Link-Objekt, das die Constraint erzeugt 
- `predecessor` - (erforderlich) *Task* - das Vorgänger-Task-Objekt

### Example

~~~jsx
gantt.attachEvent("onAfterTaskAutoSchedule",function(task, start, link, predecessor){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related samples
- [Auto Scheduling-Erweiterung](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
Dieses Ereignis ist in der **auto_scheduling**-Erweiterung definiert, daher müssen Sie das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin aktivieren. Lesen Sie die Details im [Auto Scheduling](guides/auto-scheduling.md) Artikel.
:::

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
- [auto_scheduling_strict](api/config/auto_scheduling_strict.md)
- [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md)
- [findCycles](api/method/findcycles.md)
- [isCircularLink](api/method/iscircularlink.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)