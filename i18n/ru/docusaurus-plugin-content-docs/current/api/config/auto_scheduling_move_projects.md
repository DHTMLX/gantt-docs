---
sidebar_label: auto_scheduling_move_projects
title: auto_scheduling_move_projects config
description: "Определяет, будет ли перемещён весь проект (см. подробности ниже)"
---

# auto_scheduling_move_projects

:::info
Эта функциональность доступна только в версии PRO.
:::

:::warning
Свойство было устаревшим в версии v9.1, используйте свойство `move_projects` из [gantt.config.auto_scheduling](api/config/auto_scheduling.md#move_projects) вместо этого.
:::

### Description

@short: Определяет, будет ли перемещён весь проект (см. детали ниже)

@signature: auto_scheduling_move_projects: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_move_projects = true;

gantt.init("gantt_here");
~~~

**Значение по умолчанию:** true


### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
Эта конфигурация определяется в расширении **auto_scheduling**, поэтому вам нужно активировать плагин [auto_scheduling](guides/extensions-list.md#autoscheduling). Прочтите детали в статье [Auto Scheduling](guides/auto-scheduling.md).
:::


По умолчанию (когда свойство установлено в *true*), весь проект перемещается во время авто-распределения. Это означает, что все задачи в проекте сохраняют относительное положение друг к другу и начала проекта.

![moving_project_true](/img/moving_project_true.png)

Если *auto_scheduling_move_projects* установлен в *false*, авто-распределение перемещает отдельные задачи внутри проекта. Таким образом, некоторые задачи будут перемещены, другие останутся на своих местах.

![moving_project_false](/img/moving_project_false.png)

:::note
если вы используете constraint scheduling (*gantt.config.auto_scheduling_compatibility = false*), конфигурация *auto_scheduling_move_projects* будет активна только при отключенном строгом режиме:
:::

~~~js
gantt.config.auto_scheduling_compatibility = false;
gantt.config.auto_scheduling_strict = false;
~~~

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
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
- добавлено в версии 4.1