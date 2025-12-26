---
sidebar_label: onAutoScheduleCircularLink
title: onAutoScheduleCircularLink event
description: "Wird ausgelöst, wenn während der automatischen Planung Abhängigkeitszyklen erkannt werden"
---

# onAutoScheduleCircularLink
:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::
### Description

@short: Wird ausgelöst, wenn während der automatischen Planung Abhängigkeitszyklen erkannt werden

@signature: onAutoScheduleCircularLink: (groups: any[]) =\> void;

### Parameters

- `groups` - (required) *array* - ein Array, das die im Gantt identifizierten Abhängigkeitszyklen enthält

### Example

~~~jsx
gantt.attachEvent("onAutoScheduleCircularLink",function(groups){
    // hier kann benutzerdefinierte Logik eingefügt werden
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 Diese Methode erfordert, dass das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin aktiviert ist. 
:::

Aufgaben bleiben unverändert, wenn dieses Ereignis auftritt.

Der *groups* Parameter enthält ein Array von Abhängigkeitszyklen, die im Gantt gefunden wurden. 
Jeder Eintrag im Array repräsentiert eine Gruppe von Aufgaben und Links, die einen Zyklus bilden.

~~~js
[ 
    { 
        tasks: [//IDs der Aufgaben, die in einem Zyklus beteiligt sind], 
        links: [//IDs der Links, die in einem Zyklus beteiligt sind]
    },
    {
        
        tasks: [...], 
        links: [...]
    }
]
~~~

Siehe das folgende Beispiel:

![on_autoschedule_circular_link](/img/on_autoschedule_circular_link.png)


- Aufgabe #3 hat die ID = 10
- Aufgabe #4.1 hat die ID = 12
- Der Link vom Ende der Aufgabe #3 zum Anfang der Aufgabe #4 hat die ID = 1
- Der Link vom Ende der Aufgabe #4.1 zum Anfang der Aufgabe #3 hat die ID = 2

Der *groups* Parameter wird folgendes Gruppenobjekt enthalten:

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
- ["Auto Scheduling"](guides/auto-scheduling.md)

### Change log
- hinzugefügt in Version 4.1

