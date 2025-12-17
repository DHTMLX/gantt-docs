---
sidebar_label: auto_scheduling_descendant_links
title: auto_scheduling_descendant_links config
description: "Steuert, ob Links von übergeordneten Aufgaben (Projekten) zu ihren untergeordneten Aufgaben erstellt werden können"
---

# auto_scheduling_descendant_links

### Description

@short: Steuert, ob Links von übergeordneten Aufgaben (Projekten) zu ihren untergeordneten Aufgaben erstellt werden können

@signature: auto_scheduling_descendant_links: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_descendant_links = true;
 
gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 Diese Funktion ist nur in der PRO-Version verfügbar. 
:::

:::note
 Diese Einstellung ist Teil der **auto_scheduling**-Erweiterung, daher stellen Sie sicher, dass das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin aktiviert ist. Weitere Details finden Sie im Artikel ["Auto Scheduling"](guides/auto-scheduling.md). 
:::


Standardmäßig ist das Erstellen von Links von übergeordneten Aufgaben (Projekten) zu deren untergeordneten Aufgaben nicht erlaubt.

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
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
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- ["Auto Scheduling"](guides/auto-scheduling.md)

### Change log
- hinzugefügt in Version 4.0

