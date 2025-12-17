---
sidebar_label: auto_scheduling_use_progress
title: auto_scheduling_use_progress config
description: "Legt fest, wie Scheduling-Algorithmen mit abgeschlossenen Tasks umgehen"
---

# auto_scheduling_use_progress

### Description

@short: Legt fest, wie Scheduling-Algorithmen mit abgeschlossenen Tasks umgehen

@signature: auto_scheduling_use_progress: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_use_progress = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Details

:::note
 Diese Funktion ist nur in der PRO Edition verfügbar. 
:::

:::note
 Diese Einstellung ist Teil der **auto_scheduling** oder **critical_path** Erweiterung. Um sie zu verwenden, müssen Sie das [auto_scheduling](guides/extensions-list.md#autoscheduling) oder [critical_path](guides/extensions-list.md#criticalpath) Plugin aktivieren. Weitere Informationen finden Sie in den Dokumenten ["Auto Scheduling"](guides/auto-scheduling.md) und ["Kritischer Pfad"](guides/critical-path.md). 
:::

Wenn aktiviert, berücksichtigen die Algorithmen für kritischen Pfad, Slack und Auto-Scheduling den Fortschritt der Tasks, ähnlich wie MS Project, und zwar konkret:

1) Tasks, die als abgeschlossen markiert sind (mit 100% Fortschritt), haben immer einen Slack von null;

2) Abgeschlossene Tasks werden von den Auto-Scheduling-Berechnungen ausgeschlossen. Abhängigkeiten, die Vorgänger mit abgeschlossenen Tasks verbinden, werden ignoriert;

3) Abgeschlossene Tasks können nicht Teil des kritischen Pfads sein.

:::note
Sample: [Verwendung des Fortschritts für Auto-Scheduling, kritischen Pfad und Slack-Berechnungen](https://snippet.dhtmlx.com/ju3km1uy) 
:::

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
- [auto_scheduling_strict](api/config/auto_scheduling_strict.md)
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
- ["Kritischer Pfad"](guides/critical-path.md)

### Change log
- hinzugefügt in v8.0

