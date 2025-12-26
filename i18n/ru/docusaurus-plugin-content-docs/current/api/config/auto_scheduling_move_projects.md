---
sidebar_label: auto_scheduling_move_projects
title: auto_scheduling_move_projects config
description: "определяет, будет ли весь проект сдвигаться при планировании (подробности ниже)"
---

# auto_scheduling_move_projects
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Определяет, будет ли весь проект сдвигаться при планировании (подробности ниже)

@signature: auto_scheduling_move_projects: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_move_projects = true;

gantt.init("gantt_here");
~~~

**Default value:** true

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 Эта настройка является частью расширения **auto_scheduling**, поэтому убедитесь, что плагин [auto_scheduling](guides/extensions-list.md#autoscheduling) включен. Дополнительную информацию можно найти в статье [Автоматическое планирование](guides/auto-scheduling.md). 
:::


добавлено в версии 4.1

По умолчанию (когда это свойство установлено в *true*), весь проект сдвигается при автоматическом планировании. Это означает, что все задачи сохраняют тот же порядок относительно друг друга и даты начала проекта.

![moving_project_true](/img/moving_project_true.png)

Если *auto_scheduling_move_projects* установлено в *false*, автоматическое планирование будет корректировать отдельные задачи внутри проекта. В результате некоторые задачи сдвинутся, а другие останутся на месте.

![moving_project_false](/img/moving_project_false.png)

<br>
**Примечание**, при использовании constraint scheduling (*gantt.config.auto_scheduling_compatibility = false*), настройка *auto_scheduling_move_projects* вступает в силу только если выключен строгий режим:

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
- [Автоматическое планирование](guides/auto-scheduling.md)

