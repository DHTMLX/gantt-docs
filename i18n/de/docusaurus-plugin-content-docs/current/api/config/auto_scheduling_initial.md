---
sidebar_label: auto_scheduling_initial
title: auto_scheduling_initial Konfiguration
description: "definiert, ob Gantt Autoscheduling beim Laden/Parsen von Daten durchführt"
---

# auto_scheduling_initial

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

:::warning
Die Eigenschaft wurde in v9.1 veraltet; verwenden Sie stattdessen die `schedule_on_parse`-Eigenschaft von [gantt.config.auto_scheduling](api/config/auto_scheduling.md#schedule_on_parse).
:::

### Description

@short: Definiert, ob Gantt Autoscheduling beim Laden/Parsen von Daten durchführt

@signature: auto_scheduling_initial: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_initial = false;

gantt.init("gantt_here");
~~~

**Standardwert:** true


### Related samples
- [Auto Scheduling-Erweiterung](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
Diese Konfiguration ist in der **auto_scheduling**-Erweiterung definiert, daher müssen Sie das [auto_scheduling](guides/extensions-list.md#autoscheduling)-Plugin aktivieren. Lesen Sie die Details im Artikel [Auto Scheduling](guides/auto-scheduling.md).
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
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- Die Eigenschaft wurde in v9.1 veraltet
- In Version 4.0 eingeführt