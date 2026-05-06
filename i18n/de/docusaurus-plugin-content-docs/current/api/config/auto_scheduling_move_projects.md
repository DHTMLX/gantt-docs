---
sidebar_label: auto_scheduling_move_projects
title: auto_scheduling_move_projects Konfiguration
description: "definiert, ob das gesamte Projekt verschoben wird (siehe Details unten)"
---

# auto_scheduling_move_projects

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar. 
:::

:::warning
Die Eigenschaft wurde in v9.1 veraltet; verwenden Sie stattdessen die `move_projects`-Eigenschaft von [gantt.config.auto_scheduling](api/config/auto_scheduling.md#move_projects).
:::

### Description

@short: Definiert, ob das gesamte Projekt verschoben wird (siehe Details unten)

@signature: auto_scheduling_move_projects: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_move_projects = true;

gantt.init("gantt_here");
~~~

**Standardwert:** true


### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
Diese Konfiguration ist in der **auto_scheduling**-Erweiterung definiert, daher müssen Sie das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin aktivieren. Lesen Sie die Details im Artikel [Auto Scheduling](guides/auto-scheduling.md).
:::

Standardmäßig (wenn die Eigenschaft auf *true* gesetzt ist) wird das gesamte Projekt während der Auto Scheduling verschoben. Das bedeutet, dass alle Aufgaben im Projekt relativ zueinander und zum Projektbeginn an ihren Positionen verbleiben.

![moving_project_true](/img/moving_project_true.png)

Wenn der *auto_scheduling_move_projects* auf *false* gesetzt ist, verschiebt Auto Scheduling einzelne Aufgaben innerhalb des Projekts. Dadurch werden einige Aufgaben verschoben, andere bleiben an ihren Plätzen.

![moving_project_false](/img/moving_project_false.png)

:::note
Wenn Sie Constraint Scheduling verwenden (*gantt.config.auto_scheduling_compatibility = false*), ist die Konfiguration *auto_scheduling_move_projects* nur aktiv, wenn der strikte Modus deaktiviert ist:
:::

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
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- Die Eigenschaft wurde in v9.1 veraltet
- Hinzugefügt in Version 4.1