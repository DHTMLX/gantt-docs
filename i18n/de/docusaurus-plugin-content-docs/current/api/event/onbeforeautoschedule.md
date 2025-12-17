---
sidebar_label: onBeforeAutoSchedule
title: onBeforeAutoSchedule event
description: "Löst aus, kurz bevor die automatische Planung startet"
---

# onBeforeAutoSchedule
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Löst aus, kurz bevor die automatische Planung startet

@signature: onBeforeAutoSchedule: (taskId: string | number) =\> boolean;

### Parameters

- `taskId` - (required) *string | number* - die ID der Wurzelaufgabe

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events ausgeführt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeAutoSchedule",function(taskId){
    // eigene Logik hier einfügen
    return true;
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 Dieses Event ist Teil der **auto_scheduling** Erweiterung, daher stellen Sie sicher, dass das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin aktiviert ist. Weitere Informationen finden Sie im Artikel ["Auto Scheduling"](guides/auto-scheduling.md). 
:::


Dieses Event kann blockiert werden. Wenn *false* zurückgegeben wird, wird die weitere Verarbeitung gestoppt.

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
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- ["Auto Scheduling"](guides/auto-scheduling.md)

