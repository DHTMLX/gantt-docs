---
sidebar_label: onAutoScheduleNoConverge
title: onAutoScheduleNoConverge event
description: "срабатывает, когда авто-планирование не может прийти к устойчивому результату"
---

# onAutoScheduleNoConverge
:::info
Эта функциональность доступна только в PRO-версии.
:::
### Description

@short: Срабатывает, когда авто-планирование не может прийти к устойчивому результату

@signature: onAutoScheduleNoConverge: (result: object) =\> void;

### Parameters

- `result` - (required) *object* - детали выполнения планирования, включая количество выполненных `iterations` и список собранных `conflicts`.

### Example

~~~jsx
gantt.attachEvent("onAutoScheduleNoConverge", function(result){
    console.warn("Auto scheduling did not converge", result.conflicts);
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
Это событие определяется в расширении **auto_scheduling**, поэтому необходимо активировать плагин [auto_scheduling](guides/extensions-list.md#autoscheduling). Подробности смотрите в статье [Auto Scheduling](guides/auto-scheduling.md).
:::

Авто-планирование размещает задачи на повторяющихся проходах до тех пор, пока результат перестанет изменяться. Это событие срабатывает, когда результат продолжает меняться, и движок останавливается после некоторого количества проходов без достижения устойчивого состояния. На практике это указывает на проект с завышенными ограничениями — например, набор ограничений и зависимостей, которые не могут быть удовлетворены одновременно.

Параметр `result` содержит детали выполнения:

- `iterations` - *number* - сколько проходов было выполнено.
- `converged` - *boolean* - `false` в этом событии.
- `conflicts` - *array* - конфликты, зафиксированные во время планирования (см. [onAutoScheduleConflict](api/event/onautoscheduleconflict.md) для полей конфликтов).

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
- [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md)
- [findCycles](api/method/findcycles.md)
- [isCircularLink](api/method/iscircularlink.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)
- [onAutoScheduleConflict](api/event/onautoscheduleconflict.md)

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- добавлено в версии 10.0