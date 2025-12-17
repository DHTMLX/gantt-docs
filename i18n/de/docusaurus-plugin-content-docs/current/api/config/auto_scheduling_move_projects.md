---
sidebar_label: auto_scheduling_move_projects
title: auto_scheduling_move_projects config
description: "definiert, ob das gesamte Projekt während der Planung verschoben wird (Details siehe unten)"
---

# auto_scheduling_move_projects

### Description

@short: Definiert, ob das gesamte Projekt während der Planung verschoben wird (Details siehe unten)

@signature: auto_scheduling_move_projects: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_move_projects = true;

gantt.init("gantt_here");
~~~

**Default value:** true

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 Diese Funktion ist nur in der PRO Edition verfügbar. 
:::

:::note
 Diese Einstellung ist Teil der **auto_scheduling** Erweiterung, daher stellen Sie sicher, dass das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin aktiviert ist. Weitere Informationen finden Sie im Artikel ["Auto Scheduling"](guides/auto-scheduling.md). 
:::


hinzugefügt in Version 4.1

Standardmäßig (wenn diese Eigenschaft auf *true* gesetzt ist) verschiebt sich das gesamte Projekt während der automatischen Planung. Das bedeutet, dass alle Aufgaben in der gleichen Reihenfolge zueinander und zum Projektstart bleiben.

![moving_project_true](/img/moving_project_true.png)

Wenn *auto_scheduling_move_projects* auf *false* gesetzt ist, passt die automatische Planung einzelne Aufgaben innerhalb des Projekts an. Dadurch verschieben sich einige Aufgaben, während andere an ihrem Platz bleiben.

![moving_project_false](/img/moving_project_false.png)

<br>
**Hinweis:** Bei Verwendung der Constraint-Planung (*gantt.config.auto_scheduling_compatibility = false*) wirkt die Einstellung *auto_scheduling_move_projects* nur, wenn der strikte Modus deaktiviert ist:

~~~js
gantt.config.auto_scheduling_compatibility = false;
gantt.config.auto_scheduling_strict = false;
~~~

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
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
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- ["Auto Scheduling"](guides/auto-scheduling.md)

