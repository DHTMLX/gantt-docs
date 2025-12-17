---
sidebar_label: auto_scheduling_initial
title: auto_scheduling_initial config
description: "definiert, ob das Gantt eine automatische Planung durchführt, wenn Daten geladen oder geparst werden"
---

# auto_scheduling_initial

### Description

@short: Definiert, ob das Gantt eine automatische Planung durchführt, wenn Daten geladen oder geparst werden

@signature: auto_scheduling_initial: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_initial = false;

gantt.init("gantt_here");
~~~

**Default value:** true

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 Diese Funktion ist nur in der PRO-Version verfügbar. 
:::

:::note
 Diese Einstellung ist Teil der **auto_scheduling**-Erweiterung, daher stellen Sie sicher, dass das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin aktiviert ist. Weitere Details finden Sie im Artikel ["Auto Scheduling"](guides/auto-scheduling.md). 
:::

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
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

