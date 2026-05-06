---
sidebar_label: auto_scheduling_descendant_links
title: auto_scheduling_descendant_links config
description: "Erlaubt oder forbids das Erstellen von Verknüpfungen von übergeordneten Aufgaben (Projekten) zu deren Unteraufgaben"
---

# auto_scheduling_descendant_links

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

:::warning
Die Eigenschaft wurde in v9.1 veraltet; verwenden Sie stattdessen die `descendant_links`-Eigenschaft von [gantt.config.auto_scheduling](api/config/auto_scheduling.md#descendant_links).
:::

### Description

@short: Erlaubt oder verweigert das Erstellen von Verknüpfungen von übergeordneten Aufgaben (Projekten) zu deren Unteraufgaben

@signature: auto_scheduling_descendant_links: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_descendant_links = true;
 
gantt.init("gantt_here");
~~~

**Standardwert:** false

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
Diese Konfiguration ist in der **auto_scheduling**-Erweiterung definiert, daher müssen Sie das [auto_scheduling](guides/extensions-list.md#autoscheduling) Plugin aktivieren. Lesen Sie die Details im Artikel [Auto Scheduling](guides/auto-scheduling.md).
:::

Standardmäßig können Verknüpfungen von übergeordneten Aufgaben (Projekten) zu deren Unteraufgaben nicht erstellt werden.

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
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- Die Eigenschaft wurde in v9.1 veraltet
- Hinzugefügt in Version 4.0