---
sidebar_label: auto_scheduling_initial
title: конфигурация auto_scheduling_initial
description: "определяет, будет ли gantt выполнять автопланирование при загрузке/разборе данных"
---

# auto_scheduling_initial

:::info
Эта функциональность доступна только в редакции PRO.
:::

:::warning
Свойство устарело в версии v9.1; используйте свойство `schedule_on_parse` из [gantt.config.auto_scheduling](api/config/auto_scheduling.md#schedule_on_parse).
:::

### Description

@short: Определяет, будет ли gantt выполнять автопланирование при загрузке/разборе данных

@signature: auto_scheduling_initial: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_initial = false;

gantt.init("gantt_here");
~~~

**Значение по умолчанию:** true


### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
Эта конфигурация определяется в расширении **auto_scheduling**, поэтому вам нужно активировать плагин [auto_scheduling](guides/extensions-list.md#autoscheduling). Подробности см. в статье [Auto Scheduling](guides/auto-scheduling.md).
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
- свойство устарело в версии v9.1
- добавлено в версии 4.0