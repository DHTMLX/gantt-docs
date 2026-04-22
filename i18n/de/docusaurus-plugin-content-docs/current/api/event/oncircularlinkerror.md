---
sidebar_label: onCircularLinkError
title: onCircularLinkError event
description: "Wird ausgelöst, wenn eine zirkuläre Referenz erkannt wurde und eine automatische Planung nicht möglich ist"
---

# onCircularLinkError
:::info
Diese Funktionalität ist in der PRO-Edition nur verfügbar.
:::
### Description

@short: Wird ausgelöst, wenn eine zirkuläre Referenz erkannt wurde und automatische Planung nicht möglich ist

@signature: onCircularLinkError: (link: Link, group: any) =\> void;

### Parameters

- `link` - (erforderlich) *Link* - das Link-Objekt
- `group` - (erforderlich) *object* - eine Gruppe von Aufgaben und Links, die in einer Schleife verbunden sind

### Example

~~~jsx
gantt.attachEvent("onCircularLinkError",function(link, group){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related samples
- [Auto Scheduling-Erweiterung](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

Der **group** Parameter repräsentiert ein Objekt, das eine Gruppe von Aufgaben und in einer Schleife verbundene Links enthält.

~~~js
{ 
    tasks: [//IDs der in der Schleife verbundenen Tasks], 
    links: [//IDs der in der Schleife verbundenen Links]
}
~~~

:::note
Die Methode setzt das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin voraus, das aktiviert sein muss. 
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
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- Der **group** Parameter wurde in Version 4.1 hinzugefügt.