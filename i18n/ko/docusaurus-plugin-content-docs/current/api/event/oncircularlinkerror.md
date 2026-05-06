---
sidebar_label: onCircularLinkError
title: onCircularLinkError 이벤트
description: "순환 참조가 감지되었고 자동 스케줄링이 불가능할 때 발생합니다"
---

# onCircularLinkError
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 순환 참조가 감지되었고 자동 스케줄링이 불가능할 때 발생합니다

@signature: onCircularLinkError: (link: Link, group: any) =\> void;

### Parameters

- `link` - (required) *Link* - 링크 객체
- `group` - (required) *object* - 루프에 연결된 작업 및 링크의 그룹

### Example

~~~jsx
gantt.attachEvent("onCircularLinkError",function(link, group){
    // 여기에 코드 작성
});
~~~

### Related samples
- [자동 스케줄링 확장](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

**group** 매개변수는 루프에 연결된 작업 및 링크의 그룹을 포함하는 객체를 나타냅니다.

~~~js
{ 
    tasks: [//ids of tasks connected in a loop], 
    links: [//ids of links connected in a loop]
}
~~~

:::note
메서드는 활성화된 상태에서 [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인이 필요합니다. 
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
- [자동 스케줄링](guides/auto-scheduling.md)

### Change log
- **group** 매개변수는 버전 4.1에서 추가되었습니다.