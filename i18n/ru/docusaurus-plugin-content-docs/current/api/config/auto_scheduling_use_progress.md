---
sidebar_label: auto_scheduling_use_progress
title: Настройки auto_scheduling_use_progress
description: "определяет способ обработки завершённых задач алгоритмами планирования"
---

# auto_scheduling_use_progress

:::info
Эта функциональность доступна только в версии PRO.
:::

:::warning
Свойство устарело в версии v9.1, используйте свойство `use_progress` конфигурации [gantt.config.auto_scheduling](api/config/auto_scheduling.md#use_progress) вместо него.
:::

### Description

@short: Определяет способ обработки завершённых задач алгоритмами планирования

@signature: auto_scheduling_use_progress: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_use_progress = true;

gantt.init("gantt_here");
~~~

**Значение по умолчанию:** false


### Details

:::note
Эта конфигурация определяется либо в расширении **auto_scheduling**, либо в расширении **critical_path**, поэтому нужно активировать либо плагин [auto_scheduling](guides/extensions-list.md#autoscheduling), либо [critical_path](guides/extensions-list.md#critical-path). Подробности читайте в статьях [Auto Scheduling](guides/auto-scheduling.md) и [Critical Path](guides/critical-path.md).
:::

Когда это свойство включено, критический путь, буферы и алгоритмы авто-расписания будут учитывать значение прогресса задачи, аналогично тому, как работают эти методы в MS Project, а именно:

1) Завершённые задачи (задачи с 100% прогрессом) всегда имеют нулевой буфер;

2) Завершённые задачи исключаются из вычислений авто-расписания. Связи, соединяющие предшественники с завершёнными задачами, игнорируются;

3) Завершённые задачи не могут быть критическими.

:::note
пример: [Использование прогресса для авто-расписания, расчета критического пути и буфера](https://snippet.dhtmlx.com/ju3km1uy )
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
- свойство устарело в версии v9.1
- добавлено в версии v8.0