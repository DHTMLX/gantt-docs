---
sidebar_label: auto_scheduling_descendant_links
title: auto_scheduling_descendant_links config
description: "управляет возможностью создания ссылок от родительских задач (проектов) к их дочерним задачам"
---

# auto_scheduling_descendant_links
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Управляет возможностью создания ссылок от родительских задач (проектов) к их дочерним задачам

@signature: auto_scheduling_descendant_links: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_descendant_links = true;
 
gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details


:::note
 Эта настройка является частью расширения **auto_scheduling**, поэтому убедитесь, что плагин [auto_scheduling](guides/extensions-list.md#autoscheduling) включён. Для получения дополнительной информации смотрите статью [Автоматическое планирование](guides/auto-scheduling.md). 
:::


По умолчанию создание ссылок от родительских задач (проектов) к их дочерним задачам не разрешено.

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
- [Автоматическое планирование](guides/auto-scheduling.md)

### Change log
- добавлено в версии 4.0

