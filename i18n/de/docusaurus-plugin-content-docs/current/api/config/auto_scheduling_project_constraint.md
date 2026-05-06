---
sidebar_label: auto_scheduling_project_constraint
title: auto_scheduling_project_constraint Konfiguration
description: "definiert, ob Aufgaben den Constraint-Typ von ihrem übergeordneten Projekt erben sollen"
---

# auto_scheduling_project_constraint

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

:::warning
Die Eigenschaft wurde in v9.1 veraltet; verwenden Sie stattdessen die `project_constraint`-Eigenschaft von [gantt.config.auto_scheduling](api/config/auto_scheduling.md#project_constraint).
:::

### Description

@short: Definiert, ob Aufgaben den Constraint-Typ von ihrem übergeordneten Projekt erben sollen

@signature: auto_scheduling_project_constraint: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_project_constraint = true;
~~~

**Standardwert:** false

### Related samples
- [Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

### Details

:::note
Diese Konfiguration wird in der **auto_scheduling** Erweiterung definiert, daher müssen Sie das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin aktivieren. Lesen Sie die Details im Artikel [Auto Scheduling](guides/auto-scheduling.md).
:::

Standardmäßig beeinflusst der Constraint-Typ des übergeordneten Projekts den Constraint-Typ der verschachtelten Aufgaben nicht.

Wenn Sie die Konfiguration auf *true* setzen, erhalten die Unteraufgaben (ausgenommen Aufgaben mit eigenem Constraint-Typ) denselben Constraint-Typ wie ihr übergeordnetes Projekt (z. B. **Ende spätestens**).

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
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- Die Eigenschaft wurde in v9.1 veraltet
- In v8.0 hinzugefügt