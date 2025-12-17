---
sidebar_label: auto_scheduling_use_progress
title: auto_scheduling_use_progress config
description: "Определяет, как алгоритмы планирования учитывают выполненные задачи"
---

# auto_scheduling_use_progress
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Определяет, как алгоритмы планирования учитывают выполненные задачи

@signature: auto_scheduling_use_progress: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_use_progress = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Details


:::note
Эта настройка является частью расширений **auto_scheduling** или **critical_path**. Для её использования необходимо включить плагин [auto_scheduling](guides/extensions-list.md#autoscheduling) или [critical_path](guides/extensions-list.md#criticalpath). Дополнительную информацию можно найти в документах [Автоматическое планирование](guides/auto-scheduling.md) и [Критический путь](guides/critical-path.md). 
:::

При включении алгоритмы критического пути, slack и авто-планирования учитывают прогресс задач, аналогично работе MS Project, а именно:

1) Задачи, отмеченные как выполненные (с прогрессом 100%), всегда имеют нулевой slack;

2) Выполненные задачи исключаются из расчётов авто-планирования. Зависимости, связывающие предшественников с выполненными задачами, игнорируются;

3) Выполненные задачи не могут входить в критический путь.

:::note
Sample: [Использование прогресса для авто-планирования, расчёта критического пути и slack](https://snippet.dhtmlx.com/ju3km1uy) 
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
- [Автоматическое планирование](guides/auto-scheduling.md)
- [Критический путь](guides/critical-path.md)

### Change log
- добавлено в версии v8.0

