---
sidebar_label: auto_scheduling_descendant_links
title: конфигурация auto_scheduling_descendant_links
description: "Разрешает или запрещает создание связей от родительских задач (проектов) к их дочерним"
---

# auto_scheduling_descendant_links

:::info
Эта функциональность доступна только в редакции PRO.
:::

:::warning
Свойство помечено как устаревшее в версии v9.1; используйте свойство `descendant_links` из [gantt.config.auto_scheduling](api/config/auto_scheduling.md#descendant_links) вместо этого.
:::

### Description

@short: Разрешает или запрещает создание связей от родительских задач (проектов) к их дочерним задачам

@signature: auto_scheduling_descendant_links: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_descendant_links = true;
 
gantt.init("gantt_here");
~~~

**Значение по умолчанию:** false

### Related samples
- [расширение Auto Scheduling](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
Эта настройка определяется в расширении **auto_scheduling**, поэтому необходимо активировать плагин [auto_scheduling](guides/extensions-list.md#autoscheduling). Подробности смотрите в статье [Auto Scheduling](guides/auto-scheduling.md).
:::

По умолчанию создавать связи от родительских задач (проектов) к их дочерним задачам нельзя.

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
- свойство устарело в версии v9.1
- добавлено в версии 4.0