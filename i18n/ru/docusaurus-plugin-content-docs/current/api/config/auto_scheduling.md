---
sidebar_label: auto_scheduling
title: auto_scheduling config
description: "включает авто-планирование"
---

# auto_scheduling
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Включает авто-планирование

@signature: auto_scheduling: boolean | AutoSchedulingConfig

### Example

~~~jsx
gantt.config.auto_scheduling = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 Эта настройка является частью расширения **auto_scheduling**, поэтому убедитесь, что плагин [auto_scheduling](guides/extensions-list.md#autoscheduling) включен. Подробнее об этом можно прочитать в статье [Автоматическое планирование](guides/auto-scheduling.md). 
:::


Опция `auto_scheduling` может быть либо булевым значением, либо объектом, предоставляющим более детальный контроль над работой авто-планирования. При использовании объекта можно настроить следующие параметры:

- **enabled** - (*boolean*) - включает или отключает авто-планирование, аналогично установке булевого значения напрямую.
- **show_constraints?** - (*boolean*) - управляет отображением ограничений задач на диаграмме Ганта.
Установите `true` для отображения ограничений или `false` для их скрытия.

Например, чтобы включить авто-планирование, но скрыть ограничения задач:

~~~js
gantt.config.auto_scheduling = {
  enabled: true,
  show_constraints: false
};
gantt.init("gantt_here");
~~~

### Related API
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
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
- [Автоматическое планирование](guides/auto-scheduling.md)

### Change log
- Начиная с версии 9.0, эта настройка может быть задана в виде объекта

