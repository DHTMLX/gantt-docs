---
sidebar_label: onAutoScheduleNoConverge
title: onAutoScheduleNoConverge 이벤트
description: "자동 스케줄링이 안정적인 결과에 수렴하지 못할 때 발생합니다"
---

# onAutoScheduleNoConverge
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::
### Description

@short: 자동 스케줄링이 안정적인 결과에 수렴하지 못할 때 발생합니다

@signature: onAutoScheduleNoConverge: (result: object) =\> void;

### Parameters

- `result` - (required) *object* - 스케줄링 실행의 세부 정보, 수행된 `iterations` 수와 수집된 `conflicts` 목록을 포함합니다.

### Example

~~~jsx
gantt.attachEvent("onAutoScheduleNoConverge", function(result){
    console.warn("자동 스케줄링이 수렴하지 못했습니다", result.conflicts);
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
이벤트는 **auto_scheduling** 확장에 정의되어 있으므로 [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인을 활성화해야 합니다. 자세한 내용은 [Auto Scheduling](guides/auto-scheduling.md) 문서를 참조하십시오.
:::

자동 스케줄링은 결과가 더 이상 변하지 않을 때까지 반복 패스로 태스크를 배치합니다. 이 이벤트는 결과가 계속 변하고 엔진이 안정된 상태에 도달하지 못한 채 여러 차례의 패스 후 종료될 때 발생합니다. 실제로 이는 모든 제약 조건과 종속성이 동시에 만족될 수 없는 과도하게 제약된 프로젝트를 가리킵니다.

`result` 매개변수에는 실행의 세부 정보가 포함됩니다:

- `iterations` - *number* - 수행된 패스 수.
- `converged` - *boolean* - 이 이벤트에서는 `false`입니다.
- `conflicts` - *array* - 스케줄링 중 수집된 충돌 목록(충돌 필드에 대해서는 [onAutoScheduleConflict](api/event/onautoscheduleconflict.md) 참고).

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
- 버전 10.0에서 추가됨