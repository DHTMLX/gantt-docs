---
sidebar_label: onBeforeAutoSchedule
title: onBeforeAutoSchedule event
description: "Срабатывает непосредственно перед началом авторасписания"
---

# onBeforeAutoSchedule
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Срабатывает непосредственно перед началом авторасписания

@signature: onBeforeAutoSchedule: (taskId: string | number) =\> boolean;

### Parameters

- `taskId` - (required) *string | number* - ID корневой задачи

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или оно будет отменено (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeAutoSchedule",function(taskId){
    // поместите здесь свою пользовательскую логику
    return true;
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
Это событие является частью расширения **auto_scheduling**, поэтому убедитесь, что плагин [auto_scheduling](guides/extensions-list.md#autoscheduling) включен. Подробнее см. в статье [Автоматическое планирование](guides/auto-scheduling.md). 
:::


Это событие можно заблокировать. Возврат *false* остановит дальнейшую обработку.

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
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- [Автоматическое планирование](guides/auto-scheduling.md)

