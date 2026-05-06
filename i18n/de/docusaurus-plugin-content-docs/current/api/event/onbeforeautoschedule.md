---
sidebar_label: onBeforeAutoSchedule
title: onBeforeAutoSchedule event
description: "wird vor der automatischen Terminplanung ausgelöst"
---

# onBeforeAutoSchedule
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Wird vor der automatischen Terminplanung ausgelöst

@signature: onBeforeAutoSchedule: (taskId: string | number) =\> boolean;

### Parameters

- `taskId` - (required) *string | number* - die Wurzelaufgaben-ID

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion des Events ausgelöst wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeAutoSchedule",function(taskId){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
    return true;
});
~~~

### Related samples
- [Auto Scheduling-Erweiterung](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
Dieses Event ist in der **auto_scheduling** Erweiterung definiert, daher müssen Sie das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin aktivieren. Lesen Sie die Details im [Auto Scheduling](guides/auto-scheduling.md) Artikel.
:::

Das Event kann blockiert werden. Die Rückgabe von *false* beendet die weitere Verarbeitung.

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
- [Auto Scheduling](guides/auto-scheduling.md)