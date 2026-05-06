---
sidebar_label: auto_scheduling_project_constraint
title: конфигурация auto_scheduling_project_constraint
description: "определяет, должны ли задачи наследовать тип ограничения от их родительского проекта"
---

# auto_scheduling_project_constraint

:::info
Эта функциональность доступна только в PRO-издании.
:::

:::warning
Свойство устарело в версии v9.1, используйте свойство `project_constraint` из [gantt.config.auto_scheduling](api/config/auto_scheduling.md#project_constraint) вместо этого.
:::

### Description

@short: Определяет, должны ли задачи наследовать тип ограничения от их родительского проекта

@signature: auto_scheduling_project_constraint: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_project_constraint = true;
~~~

**Значение по умолчанию:** false

### Связанные примеры
- [Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

### Подробности

:::note
Этот конфиг определяется в расширении **auto_scheduling**, поэтому необходимо активировать плагин [auto_scheduling](guides/extensions-list.md#autoscheduling). Подробности смотрите в статье [Auto Scheduling](guides/auto-scheduling.md).
:::

По умолчанию тип ограничения у родительского проекта не влияет на тип ограничения вложенных задач.

Если установить конфигурацию в значение *true*, дочерние задачи (за исключением задач со своим собственным типом ограничения) будут иметь такой же тип ограничения, как и у родительского проекта (например, **finish no later than**).

### Связанные API
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

### Связанные руководства
- [Auto Scheduling](guides/auto-scheduling.md)

### Журнал изменений
- свойство устарело в версии v9.1
- добавлено в версии v8.0