--- 
sidebar_label: onBeforeTaskAutoSchedule
title: onBeforeTaskAutoSchedule event
description: "재스케줄링되는 각 작업에 대해 발생합니다"
---

# onBeforeTaskAutoSchedule
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 재스케줄링되는 각 작업에 대해 발생합니다

@signature: onBeforeTaskAutoSchedule: (task: Task, start: Date, link: Link, predecessor: Task) => boolean;

### Parameters

- `task` - (required) *Task* - 작업 객체
- `start` - (required) *Date* - 새로운 시작 날짜
- `link` - (required) *Link* - 제약 조건을 생성하는 링크 객체
- `predecessor` - (required) *Task* - 선행 작업 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소됩니다 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskAutoSchedule",function(task, start, link, predecessor){
    // 여기에 코드 작성
    return true;
});
~~~

### Related samples
- [자동 스케줄링 확장](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
이벤트는 **auto_scheduling** 확장에 정의되어 있으므로 auto_scheduling 플러그인을 활성화해야 합니다. 자세한 내용은 [자동 스케줄링](guides/auto-scheduling.md) 기사에서 확인하십시오. 
:::

The event is blockable. Returning *false* will cancel further processing.

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
- [onCircularLinkError](api/event/oncircularlinkerror.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- [자동 스케줄링](guides/auto-scheduling.md)