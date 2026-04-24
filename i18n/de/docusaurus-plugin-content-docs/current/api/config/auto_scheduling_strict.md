---
sidebar_label: auto_scheduling_strict
title: auto_scheduling_strict config
description: "Aktiviert den Auto Scheduling-Modus, in dem Aufgaben stets auf das frühestmögliche Datum neu geplant werden"
---

# auto_scheduling_strict

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

:::warning
Die Eigenschaft wurde in v9.1 veraltet; verwenden Sie stattdessen die `gap_behavior`-Eigenschaft von [gantt.config.auto_scheduling](api/config/auto_scheduling.md#gap_behavior).
:::

### Description

@short: Aktiviert den Auto Scheduling-Modus, in dem Aufgaben stets auf das frühestmögliche Datum neu geplant werden

@signature: auto_scheduling_strict: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_strict = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Auto Scheduling-Erweiterung](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
Diese Konfiguration ist in der **auto_scheduling**-Erweiterung definiert, daher müssen Sie das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin aktivieren. Lesen Sie die Details im Artikel [Auto Scheduling](guides/auto-scheduling.md).

Beachten Sie, dass die Konfiguration in den Versionen 6.1.0 - 7.1.3 nur funktioniert, wenn die Option [auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md) aktiviert ist.
:::

Standardmäßig werden Aufgaben nur neu geplant, wenn ein neues Datum gegen die Einschränkung verstößt.

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
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
- die property wurde in v9.1 veraltet