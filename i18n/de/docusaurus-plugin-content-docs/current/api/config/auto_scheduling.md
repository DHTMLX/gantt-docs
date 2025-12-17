---
sidebar_label: auto_scheduling
title: auto_scheduling config
description: "ermöglicht auto scheduling"
---

# auto_scheduling

### Description

@short: Ermöglicht auto scheduling

@signature: auto_scheduling: boolean | AutoSchedulingConfig

### Example

~~~jsx
gantt.config.auto_scheduling = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 Diese Funktion ist ausschließlich in der PRO Edition verfügbar. 
:::

:::note
 Diese Einstellung ist Teil der **auto_scheduling** Erweiterung, daher stellen Sie sicher, dass das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin aktiviert ist. Weitere Details finden Sie im Artikel ["Auto Scheduling"](guides/auto-scheduling.md). 
:::


Die Option `auto_scheduling` kann entweder ein Boolean oder ein Objekt sein, das eine detailliertere Steuerung darüber ermöglicht, wie das auto_scheduling funktioniert. Wenn ein Objekt verwendet wird, können Sie Folgendes konfigurieren:

- **enabled** - (*boolean*) - schaltet auto_scheduling ein oder aus, ähnlich wie bei direkter Verwendung eines Boolean-Werts.
- **show_constraints?** - (*boolean*) - steuert, ob Task-Beschränkungen (constraints) im Gantt-Chart angezeigt werden.
Setzen Sie diesen Wert auf `true`, um die constraints anzuzeigen, oder auf `false`, um sie zu verbergen.

Beispielsweise, um auto_scheduling einzuschalten, aber die Task-Beschränkungen verborgen zu halten:

~~~js
gantt.config.auto_scheduling = {
  enabled: true,
  show_constraints: false
};
gantt.init("gantt_here");
~~~

### Related API
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
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

### Change log
- Seit Version 9.0 kann diese Konfiguration als Objekt definiert werden

