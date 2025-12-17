---
sidebar_label: onAutoScheduleCircularLink
title: onAutoScheduleCircularLink event
description: "자동 스케줄링 중 의존성 루프가 감지될 때 트리거됩니다."
---

# onAutoScheduleCircularLink
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 자동 스케줄링 중 의존성 루프가 감지될 때 트리거됩니다.

@signature: onAutoScheduleCircularLink: (groups: any[]) =\> void;

### Parameters

- `groups` - (required) *array* - 간트 차트에서 식별된 의존성 루프들을 포함하는 배열입니다.

### Example

~~~jsx
gantt.attachEvent("onAutoScheduleCircularLink",function(groups){
    // 여기에 사용자 정의 로직을 작성하세요
});
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details


:::note
 이 메서드를 사용하려면 [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인이 활성화되어 있어야 합니다. 
:::

이 이벤트가 발생해도 작업은 변경되지 않습니다.

*groups* 매개변수는 간트에서 발견된 의존성 루프들의 배열을 담고 있습니다.  
배열의 각 항목은 루프를 형성하는 작업들과 링크들의 그룹을 나타냅니다.

~~~js
[ 
    { 
        tasks: [// 루프에 포함된 작업 ID들], 
        links: [// 루프에 포함된 링크 ID들]
    },
    {
        
        tasks: [...], 
        links: [...]
    }
]
~~~

아래 예제를 참고하세요:

![on_autoschedule_circular_link](/img/on_autoschedule_circular_link.png)


- 작업 #3의 ID는 10입니다.
- 작업 #4.1의 ID는 12입니다.
- 작업 #3의 끝에서 작업 #4의 시작으로 연결된 링크의 ID는 1입니다.
- 작업 #4.1의 끝에서 작업 #3의 시작으로 연결된 링크의 ID는 2입니다.

*groups* 매개변수는 다음과 같은 그룹 객체를 포함합니다:

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

