---
sidebar_label: onBeforeAutoSchedule
title: onBeforeAutoSchedule event
description: "자동 스케줄링이 시작되기 직전에 트리거됩니다."
---

# onBeforeAutoSchedule
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 자동 스케줄링이 시작되기 직전에 트리거됩니다.

@signature: onBeforeAutoSchedule: (taskId: string | number) =\> boolean;

### Parameters

- `taskId` - (required) *string | number* - 루트 작업의 ID

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 진행될지(<b>true</b>) 취소될지(<b>false</b>) 결정합니다.

### Example

~~~jsx
gantt.attachEvent("onBeforeAutoSchedule",function(taskId){
    // 여기에 사용자 정의 로직을 작성하세요
    return true;
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 이 이벤트는 **auto_scheduling** 확장의 일부이므로, [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인이 활성화되어 있는지 확인하세요. 자세한 내용은 [자동 스케줄링](guides/auto-scheduling.md) 문서를 참고하세요. 
:::

이 이벤트는 차단할 수 있습니다. *false*를 반환하면 추가 처리가 중단됩니다.

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
- [자동 스케줄링](guides/auto-scheduling.md)

