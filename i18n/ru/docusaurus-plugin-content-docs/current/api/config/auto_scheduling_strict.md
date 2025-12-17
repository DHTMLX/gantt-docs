---
sidebar_label: auto_scheduling_strict
title: auto_scheduling_strict config
description: "включает режим авто-планирования, при котором задачи каждый раз перепланируются на максимально раннюю возможную дату"
---

# auto_scheduling_strict
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Включает режим авто-планирования, при котором задачи каждый раз перепланируются на максимально раннюю возможную дату

@signature: auto_scheduling_strict: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_strict = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details


:::note
 Эта настройка является частью расширения **auto_scheduling**, поэтому убедитесь, что плагин [auto_scheduling](guides/extensions-list.md#autoscheduling) активирован. Для получения дополнительной информации смотрите статью [Автоматическое планирование](guides/auto-scheduling.md).<br>

Имейте в виду, что для версий с 6.1.0 по 7.1.3 эта конфигурация работает только при включенной опции [auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md). 
:::


Обычно задачи перепланируются только в случае, если новая дата нарушает ограничение.

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
- [Автоматическое планирование](guides/auto-scheduling.md)

