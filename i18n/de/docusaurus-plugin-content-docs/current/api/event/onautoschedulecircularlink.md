---
sidebar_label: onAutoScheduleCircularLink
title: onAutoScheduleCircularLink event
description: "Wird ausgelöst, wenn während der automatischen Terminplanung Abhängigkeits-Schleifen gefunden wurden"
---

# onAutoScheduleCircularLink
:::info
Diese Funktionalität ist ausschließlich in der PRO-Edition verfügbar.
:::
### Description

@short: Wird ausgelöst, wenn während der automatischen Terminplanung Abhängigkeits-Schleifen gefunden wurden

@signature: onAutoScheduleCircularLink: (groups: any[]) => void;

### Parameters

- `groups` - (erforderlich) *Array* - ein Array von Abhängigkeits-Schleifen, die im Gantt gefunden wurden

### Example

~~~jsx
gantt.attachEvent("onAutoScheduleCircularLink",function(groups){
    // Fügen Sie hier Ihre benutzerdefinierte Logik ein
});
~~~

### Related samples
- [Auto Scheduling-Erweiterung](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
Die Methode erfordert das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin, das aktiviert werden muss. 
:::

Tasks werden nicht geändert, wenn dieses Ereignis ausgelöst wird. 

Der *groups*-Parameter repräsentiert ein Array von Abhängigkeits-Schleifen, die im Gantt gefunden wurden. 
Jedes Element des Arrays ist eine Gruppe von Aufgaben und Links, die eine Schleife bilden.

~~~js
[ 
    { 
        tasks: ["10", "12"], 
        links: ["1", "2"]
    }
]
~~~

Schauen Sie sich das folgende Beispiel an:

- Die Aufgabe #3 hat die ID = 10
- Die Aufgabe #4.1 hat die ID = 12
- Der Link vom Ende der Aufgabe #3 zum Anfang der Aufgabe #4 hat die ID = 1
- Der Link vom Ende der Aufgabe #4.1 zum Anfang der Aufgabe #3 hat die ID = 2

Der *groups*-Parameter wird das folgende Gruppenobjekt enthalten:

~~~js
[ 
    { 
        tasks: ["10", "12"], 
        links: ["1", "2"]
    }
]
~~~

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
- [onCircularLinkError](api/event/oncircularlinkerror.md)

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- hinzugefügt in Version 4.1