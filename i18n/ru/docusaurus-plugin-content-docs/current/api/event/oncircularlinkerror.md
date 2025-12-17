---
sidebar_label: onCircularLinkError
title: onCircularLinkError event
description: "срабатывает при обнаружении циклической ссылки и невозможности продолжить авторасписание"
---

# onCircularLinkError
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Срабатывает при обнаружении циклической ссылки и невозможности продолжить авторасписание

@signature: onCircularLinkError: (link: Link, group: any) =\> void;

### Parameters

- `link` - (required) *Link* - объект ссылки
- `group` - (required) *object* - набор задач и ссылок, образующих цикл

### Example

~~~jsx
gantt.attachEvent("onCircularLinkError",function(link, group){
    // разместите здесь вашу пользовательскую логику
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

Параметр **group** содержит объект, представляющий коллекцию задач и ссылок, вовлечённых в цикл.

~~~js
{ 
    tasks: [//идентификаторы задач, связанных циклом], 
    links: [//идентификаторы ссылок, связанных циклом]
}
~~~

:::note
 Для работы метода необходимо включить плагин [auto_scheduling](guides/extensions-list.md#autoscheduling). 
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
- [isCircularLink](api/method/iscircularlink.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- [Автоматическое планирование](guides/auto-scheduling.md)

### Change log
- Параметр **group** был добавлен в версии 4.1.

