---
sidebar_label: auto_scheduling_project_constraint
title: auto_scheduling_project_constraint config
description: "управляет тем, наследуют ли задачи тип ограничения от своего родительского проекта"
---

# auto_scheduling_project_constraint
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Управляет тем, наследуют ли задачи тип ограничения от своего родительского проекта

@signature: auto_scheduling_project_constraint: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_project_constraint = true;
~~~

**Default value:** false

### Related samples
- [Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

### Details

:::note
Эта настройка является частью расширения **auto_scheduling**, поэтому убедитесь, что плагин [auto_scheduling](guides/extensions-list.md#autoscheduling) включен. Дополнительную информацию можно найти в статье [Автоматическое планирование](guides/auto-scheduling.md). 
:::

По умолчанию тип ограничения, назначенный родительскому проекту, не влияет на тип ограничения его дочерних задач.

Если эта опция установлена в *true*, дочерние задачи (если у них не указан собственный тип ограничения) будут наследовать тип ограничения своего родительского проекта, например, **finish no later than**.

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
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
- [Автоматическое планирование](guides/auto-scheduling.md)

### Change log
- добавлено в версии v8.0

