---
sidebar_label: onAfterTaskAutoSchedule
title: onAfterTaskAutoSchedule event
description: "Löst für jede Aufgabe aus, die automatisch geplant wird"
---

# onAfterTaskAutoSchedule

:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Löst für jede Aufgabe aus, die automatisch geplant wird

@signature: onAfterTaskAutoSchedule: (task: Task, start: Date, link: Link, predecessor: Task) =\> void;

### Parameters

- `task` - (required) *Task* - das Aufgabenobjekt
- `start` - (required) *Date* - das aktualisierte Startdatum
- `link` - (required) *Link* - das Link-Objekt, das die Einschränkung verursacht
- `predecessor` - (required) *Task* - das Vorgänger-Aufgabenobjekt

### Example

~~~jsx
gantt.attachEvent("onAfterTaskAutoSchedule",function(task, start, link, predecessor){
    // hier Ihre benutzerdefinierte Logik einfügen
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 Dieses Event ist Teil der **auto_scheduling** Erweiterung, daher stellen Sie sicher, dass das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin aktiviert ist. Weitere Informationen finden Sie im Artikel ["Auto Scheduling"](guides/auto-scheduling.md). 
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
- ["Auto Scheduling"](guides/auto-scheduling.md)

