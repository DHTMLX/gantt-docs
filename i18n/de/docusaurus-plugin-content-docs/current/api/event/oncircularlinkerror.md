---
sidebar_label: onCircularLinkError
title: onCircularLinkError event
description: "wird ausgelöst, wenn eine zirkuläre Referenz gefunden wird und die automatische Planung nicht fortgesetzt werden kann"
---

# onCircularLinkError
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Wird ausgelöst, wenn eine zirkuläre Referenz gefunden wird und die automatische Planung nicht fortgesetzt werden kann

@signature: onCircularLinkError: (link: Link, group: any) =\> void;

### Parameters

- `link` - (required) *Link* - das Link-Objekt
- `group` - (required) *object* - eine Gruppe von Tasks und Links, die eine Schleife bilden

### Example

~~~jsx
gantt.attachEvent("onCircularLinkError",function(link, group){
    // hier Ihre eigene Logik einfügen
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

Der **group** Parameter enthält ein Objekt, das eine Sammlung von Tasks und Links repräsentiert, die an einer Schleife beteiligt sind.

~~~js
{ 
    tasks: [//IDs der in der Schleife verbundenen Tasks], 
    links: [//IDs der in der Schleife verbundenen Links]
}
~~~

:::note
 Die Methode erfordert, dass das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin aktiviert ist. 
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
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- ["Auto Scheduling"](guides/auto-scheduling.md)

### Change log
- Der **group** Parameter wurde in Version 4.1 eingeführt.

