---
sidebar_label: auto_scheduling_project_constraint
title: auto_scheduling_project_constraint config
description: "Steuert, ob Aufgaben den Constraint-Typ von ihrem übergeordneten Projekt erben"
---

# auto_scheduling_project_constraint

### Description

@short: Steuert, ob Aufgaben den Constraint-Typ von ihrem übergeordneten Projekt erben

@signature: auto_scheduling_project_constraint: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_project_constraint = true;
~~~

**Default value:** false

### Related samples
- [Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

### Details

:::note
 Diese Funktion ist nur in der PRO-Edition verfügbar. 
:::

:::note
 Diese Konfiguration ist Teil der **auto_scheduling** Erweiterung. Stellen Sie daher sicher, dass das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin aktiviert ist. Weitere Informationen finden Sie im Artikel ["Auto Scheduling"](guides/auto-scheduling.md). 
:::

Standardmäßig beeinflusst der Constraint-Typ, der einem übergeordneten Projekt zugewiesen ist, nicht den Constraint-Typ seiner untergeordneten Aufgaben.

Wenn diese Option auf *true* gesetzt ist, erben untergeordnete Aufgaben (sofern sie keinen eigenen Constraint-Typ angegeben haben) den Constraint-Typ ihres übergeordneten Projekts, z. B. **finish no later than**.

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
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

### Change log
- hinzugefügt in v8.0

