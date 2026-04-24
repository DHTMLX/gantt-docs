---
sidebar_label: auto_scheduling_strict
title: auto_scheduling_strict config
description: "включает режим автоматического планирования, при котором задачи будут всегда перепланированы на максимально раннюю возможную дату"
---

# auto_scheduling_strict

:::info
Эта функциональность доступна только в PRO-версии.
:::

:::warning
Свойство устарело в версии v9.1; вместо него используйте свойство `gap_behavior` из [gantt.config.auto_scheduling](api/config/auto_scheduling.md#gap_behavior).
:::

### Description

@short: Включает режим автоматического планирования, при котором задачи будут всегда перепланированы на максимально раннюю возможную дату

@signature: auto_scheduling_strict: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_strict = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Расширение Auto Scheduling](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
Этот конфиг определяется в расширении **auto_scheduling**, поэтому необходимо активировать плагин [auto_scheduling](guides/extensions-list.md#autoscheduling). Подробности читайте в статье [Auto Scheduling](guides/auto-scheduling.md).

Обратите внимание, что в версиях 6.1.0 - 7.1.3 конфигурация работает только при включённой опции [auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md).
:::

По умолчанию задачи перепланируются только тогда, когда новая дата нарушает ограничение.

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
- Свойство устарело в версии v9.1