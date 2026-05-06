---
sidebar_label: findCycles
title: findCycles method
description: "liefert alle Abhängigkeitsschleifen im Diagramm zurück"
---

# findCycles

:::info
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::

### Description

@short: Gibt alle Abhängigkeitsschleifen im Diagramm zurück

@signature: findCycles: () =\> any[]

### Returns
- `cycles` - (array) - ein Array von Abhängigkeitsschleifen, die im Gantt-Diagramm gefunden wurden

### Example

~~~jsx
var cycles = gantt.findCycles();
~~~

### Related samples
- [Auto Scheduling-Erweiterung](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
Die Methode erfordert das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin, das aktiviert sein muss. 
:::

Jedes Element des *cycles*-Arrays ist eine Gruppe von Aufgaben (Tasks) und Verknüpfungen (Links), die eine Schleife bilden.

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

Schauen Sie sich das folgende Beispiel an:

- Die Aufgabe #3 hat die ID = 10
- Die Aufgabe #4.1 hat die ID = 12
- Der Link vom Ende der Aufgabe #3 zum Anfang der Aufgabe #4 hat die ID = 1
- Der Link vom Ende der Aufgabe #4.1 zum Anfang der Aufgabe #3 hat die ID = 2

Die Methode *gantt.findCycles* gibt folgenden Wert zurück:

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
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- hinzugefügt in Version 4.1