---
sidebar_label: onBeforeTaskAutoSchedule
title: onBeforeTaskAutoSchedule event
description: "Wird für jede Aufgabe ausgelöst, die neu geplant wird"
---

# onBeforeTaskAutoSchedule
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Wird für jede Aufgabe ausgelöst, die neu geplant wird

@signature: onBeforeTaskAutoSchedule: (task: Task, start: Date, link: Link, predecessor: Task) =\> boolean;

### Parameters

- `task` - (required) *Task* - Das Task-Objekt
- `start` - (required) *Date* - Das neue Startdatum
- `link` - (required) *Link* - Das Link-Objekt, das die Einschränkung verursacht
- `predecessor` - (required) *Task* - Das Vorgänger-Task-Objekt

### Returns
- ` result` - (boolean) - Gibt an, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder gestoppt wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskAutoSchedule",function(task, start, link, predecessor){
    // benutzerdefinierte Logik hier einfügen
    return true;
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 Dieses Event ist Teil der **auto_scheduling**-Erweiterung. Stellen Sie daher sicher, dass das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin aktiviert ist. Weitere Details finden Sie im Artikel ["Auto Scheduling"](guides/auto-scheduling.md). 
:::


Dieses Event kann blockiert werden. Wird *false* zurückgegeben, wird die weitere Verarbeitung gestoppt.

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
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- ["Auto Scheduling"](guides/auto-scheduling.md)

