---
sidebar_label: isCircularLink
title: isCircularLink method
description: "проверяет, является ли ссылка цикличной"
---

# isCircularLink
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Проверяет, является ли ссылка цикличной

@signature: isCircularLink: (link: Link) =\> boolean

### Parameters

- `link` - (required) *Link* - объект ссылки

### Returns
- ` state` - (boolean) - возвращает true, если ссылка циклична, иначе false

### Example

~~~jsx
var isCircular = gantt.isCircularLink(link);
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 Для работы метода требуется включенный плагин [auto_scheduling](guides/extensions-list.md#autoscheduling). 
:::

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
- [auto_scheduling_strict](api/config/auto_scheduling_strict.md)
- [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md)
- [findCycles](api/method/findcycles.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)

### Related Guides
- [Автоматическое планирование](guides/auto-scheduling.md)

### Change log
- добавлено в версии 4.1

