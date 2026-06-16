---
sidebar_label: onAutoScheduleConflict
title: onAutoScheduleConflict event
description: "срабатывает для каждого конфликта, обнаруженного во время автоматического планирования"
---

# onAutoScheduleConflict
:::info
Эта функциональность доступна только в PRO-версии.
:::
### Description

@short: Срабатывает для каждого конфликта, обнаруженного во время автоматического планирования

@signature: onAutoScheduleConflict: (conflict: object) => void;

### Parameters

- `conflict` - (required) *object* - конфликт, найденный во время планирования. Набор полей зависит от типа конфликта `kind`.

### Example

~~~jsx
gantt.attachEvent("onAutoScheduleConflict", function(conflict){
    if (conflict.kind === "constraint-violation") {
        console.warn(`Задача ${conflict.taskId}: ограничение ${conflict.constraintType} не может быть удовлетворено`);
    }
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
Это событие определяется в расширении **auto_scheduling**, поэтому необходимо активировать плагин [auto_scheduling](guides/extensions-list.md#autoscheduling). Подробности смотрите в статье [Auto Scheduling](guides/auto-scheduling.md).
:::

Событие срабатывает один раз для каждого конфликта, с которым сталкивается автоматическое планирование. Автоматическое планирование по-прежнему выдает результат — событие позволяет отображать конфликты в пользовательском интерфейсе или реагировать на них.

Поле `conflict.kind` определяет тип конфликта и доступные поля:

| `kind` | Description | Fields |
|---|---|---|
| `"constraint-violation"` | Ограничение задачи не может быть удовлетворено в запланированной позиции. | `taskId`, `constraintType`, `required` *(Date)*, `actual` *(Date)* |
| `"calendar-non-working"` | Задача попала в своё нерабочее время. Сообщается только при включенном [strict_calendar](api/config/auto_scheduling.md#strict_calendar). | `taskId`, `proposedDate` *(Date)*, `snappedDate` *(Date)* |
| `"unscheduled-dependency"` | Задача зависит от задачи, которая не запланирована. | `taskId`, `blockedBy` |

Цепочки зависимостей сообщаются через отдельное событие [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md), а не здесь.

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
- [onAutoScheduleNoConverge](api/event/onautoschedulenoconverge.md)

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- добавлено в версии 10.0