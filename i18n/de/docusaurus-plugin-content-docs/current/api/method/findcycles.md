---
sidebar_label: findCycles
title: findCycles method
description: "gibt alle in der Chart gefundenen Abhängigkeitskreise zurück"
---

# findCycles

### Description

@short: Gibt alle in der Chart gefundenen Abhängigkeitskreise zurück

@signature: findCycles: () =\> any[]

### Returns
- ` cycles` - (array) - ein Array, das die im Gantt-Diagramm erkannten Abhängigkeitskreise enthält

### Example

~~~jsx
var cycles = gantt.findCycles();
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 Dieses Feature ist nur in der PRO-Version enthalten. 
:::

:::note
 Die Methode erfordert, dass das Plugin [auto_scheduling](guides/extensions-list.md#autoscheduling) aktiviert ist. 
:::

Jeder Eintrag im *cycles*-Array repräsentiert eine Menge von Tasks und Links, die einen Zyklus bilden.

~~~js
[ 
    { 
        tasks: [//IDs der Tasks, die an einem Zyklus beteiligt sind], 
        links: [//IDs der Links, die an einem Zyklus beteiligt sind]
    },
    {
        
        tasks: [...], 
        links: [...]
    }
]
~~~

Hier ein Beispiel zur Veranschaulichung:

![on_autoschedule_circular_link](/img/on_autoschedule_circular_link.png)


- Task #3 hat die ID = 10
- Task #4.1 hat die ID = 12
- Der Link vom Ende von Task #3 zum Anfang von Task #4 hat die ID = 1
- Der Link vom Ende von Task #4.1 zum Anfang von Task #3 hat die ID = 2

Die Methode *gantt.findCycles* liefert folgendes Ergebnis zurück:

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
- [isCircularLink](api/method/iscircularlink.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)

### Related Guides
- ["Auto Scheduling"](guides/auto-scheduling.md)

### Change log
- hinzugefügt in Version 4.1

