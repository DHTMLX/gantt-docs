---
sidebar_label: auto_scheduling_use_progress
title: auto_scheduling_use_progress Konfiguration
description: "legt fest, wie die Planungsalgorithmen abgeschlossene Aufgaben verarbeiten"
---

# auto_scheduling_use_progress

:::info
Diese Funktionalität ist nur in der PRO-Edition verfügbar.
:::

:::warning
Die Eigenschaft wurde in Version 9.1 abgekündigt. Verwenden Sie stattdessen die `use_progress`-Eigenschaft von [gantt.config.auto_scheduling](api/config/auto_scheduling.md#use_progress).
:::


### Description

@short: Legt fest, wie die Planungsalgorithmen abgeschlossene Aufgaben verarbeiten

@signature: auto_scheduling_use_progress: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_use_progress = true;

gantt.init("gantt_here");
~~~

**Standardwert:** false


### Details

:::note
Diese Konfiguration wird entweder in der **auto_scheduling**- oder der **critical_path**-Erweiterung definiert, daher müssen Sie entweder das [auto_scheduling](guides/extensions-list.md#autoscheduling) oder das [critical_path](guides/extensions-list.md#critical-path) Plugin aktivieren. Lesen Sie die Details in den Artikeln zu [Auto Scheduling](guides/auto-scheduling.md) und [Critical Path](guides/critical-path.md).
:::

Wenn die Eigenschaft aktiviert ist, berücksichtigen der kritische Pfad, Slack und Auto Scheduling-Algorithmen den Fortschritt der Aufgaben, ähnlich wie diese Methoden in MS Project funktionieren, nämlich:

1) Abgeschlossene Aufgaben (Aufgaben mit 100% Fortschritt) haben immer null Slack;

2) Abgeschlossene Aufgaben werden aus den Auto Scheduling-Berechnungen ausgeschlossen. Beziehungen, die Vorgänger mit abgeschlossenen Aufgaben verbinden, werden ignoriert;

3) Abgeschlossene Aufgaben können nicht kritisch sein.

:::note
Beispiel: [Fortschritt für Auto Scheduling, Critical Path und Slack-Berechnungen verwenden](https://snippet.dhtmlx.com/ju3km1uy)
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
- [Auto Scheduling](guides/auto-scheduling.md)
- [Critical Path](guides/critical-path.md)

### Change log
- Die Eigenschaft wurde in v9.1 abgekündigt
- Hinzugefügt in v8.0