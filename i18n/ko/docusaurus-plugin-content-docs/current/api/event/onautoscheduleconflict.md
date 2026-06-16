---
sidebar_label: onAutoScheduleConflict
title: onAutoScheduleConflict event
description: "자동 스케줄링 중 발견된 각 충돌에 대해 발생합니다"
---

# onAutoScheduleConflict
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::
### Description

@short: 자동 스케줄링 중 발견된 각 충돌에 대해 발생합니다

@signature: onAutoScheduleConflict: (conflict: object) =\> void;

### Parameters

- `conflict` - (required) *object* - 일정 중 발견된 충돌입니다. 충돌의 `kind`에 따라 사용 가능한 필드가 달라집니다.

### Example

~~~jsx
gantt.attachEvent("onAutoScheduleConflict", function(conflict){
    if (conflict.kind === "constraint-violation") {
        console.warn(`Task ${conflict.taskId}: the ${conflict.constraintType} constraint could not be satisfied`);
    }
});
~~~

### Related samples
- [자동 스케줄링 확장](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
이 이벤트는 **auto_scheduling** 확장에 정의되어 있으므로 [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인을 활성화해야 합니다. 자세한 내용은 [Auto Scheduling](guides/auto-scheduling.md) 문서를 참조하세요. 
:::

이 이벤트는 자동 스케줄링이 충돌에 부딪힐 때마다 한 번씩 발생합니다. 자동 스케줄링은 여전히 결과를 생성합니다 — 이 이벤트를 통해 UI에서 충돌을 표시하거나 이를 기반으로 반응할 수 있습니다.

`conflict.kind` 필드는 충돌의 유형과 사용 가능한 필드를 정의합니다:

| `kind` | Description | Fields |
|---|---|---|
| `"constraint-violation"` | 작업의 제약 조건이 예정 위치에서 충족될 수 없었습니다. | `taskId`, `constraintType`, `required` *(Date)*, `actual` *(Date)* |
| `"calendar-non-working"` | 작업이 자신의 비근무 시간에 배치되었습니다. 보고는 [strict_calendar](api/config/auto_scheduling.md#strict_calendar)이 활성화된 경우에만 수행됩니다. | `taskId`, `proposedDate` *(Date)*, `snappedDate` *(Date)* |
| `"unscheduled-dependency"` | 작업은 아직 스케줄되지 않은 작업에 의존합니다. | `taskId`, `blockedBy` |

충돌 간의 의존성 루프는 이 이벤트가 아닌 별도의 [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md) 이벤트에서 보고됩니다.

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
- [자동 스케줄링](guides/auto-scheduling.md)

### Change log
- 10.0 버전에서 추가됨