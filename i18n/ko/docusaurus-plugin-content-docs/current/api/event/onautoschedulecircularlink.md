---
sidebar_label: onAutoScheduleCircularLink
title: onAutoScheduleCircularLink 이벤트
description: "자동 스케줄링 중 의존성 루프가 발견되면 실행됩니다"
---

# onAutoScheduleCircularLink
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::
### Description

@short: 자동 스케줄링 중 의존성 루프가 발견되면 발생합니다

@signature: onAutoScheduleCircularLink: (groups: any[]) =\> void;

### Parameters

- `groups` - (required) *배열* - gantt에서 발견된 의존성 루프의 배열

### Example

~~~jsx
gantt.attachEvent("onAutoScheduleCircularLink",function(groups){
    // 여기에 코드 작성
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
해당 메서드는 활성화된 [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인이 필요합니다.
:::

이벤트가 발생해도 태스크는 수정되지 않습니다.

*groups* 매개변수는 gantt에서 발견된 의존성 루프의 배열을 나타냅니다.
배열의 각 요소는 루프를 구성하는 작업과 링크의 그룹입니다.

~~~js
[ 
    { 
        tasks: ["10", "12"], 
        links: ["1", "2"]
    }
]
~~~

아래 예제를 확인해 보세요:

- 작업 #3의 ID는 10입니다
- 작업 #4.1의 ID는 12입니다
- 작업 #3의 끝에서 작업 #4의 시작으로 가는 링크의 ID는 1입니다
- 작업 #4.1의 끝에서 작업 #3의 시작으로 가는 링크의 ID는 2입니다

*groups* 매개변수에는 아래의 그룹 객체가 포함됩니다:

~~~js
[ 
    { 
        tasks: ["10", "12"], 
        links: ["1", "2"]
    }
]
~~~

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
- [onCircularLinkError](api/event/oncircularlinkerror.md)

### Related Guides
- [자동 스케줄링](guides/auto-scheduling.md)

### Change log
- 버전 4.1에 추가됨

