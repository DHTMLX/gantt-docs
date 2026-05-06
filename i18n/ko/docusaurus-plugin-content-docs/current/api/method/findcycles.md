---
sidebar_label: findCycles
title: findCycles method
description: "차트에서 모든 의존성 루프를 반환합니다"
--- 

# findCycles

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
::: 

### Description

@short: 차트에서 모든 의존성 루프를 반환합니다

@signature: findCycles: () =\> any[]

### Returns
- `cycles` - (array) - gantt에서 발견된 의존성 루프의 배열

### Example

~~~jsx
var cycles = gantt.findCycles();
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
이 메서드는 [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인이 활성화되어 있어야 합니다.
::: 

각 요소는 *cycles* 배열은 루프를 형성하는 작업과 링크의 묶음입니다.

~~~js
[ 
    { 
        tasks: [//루프에 연결된 작업의 ID들], 
        links: [//루프에 연결된 링크의 ID들]
    },
    {
        
        tasks: [...], 
        links: [...]
    }
]
~~~

아래 예제를 확인해 보세요:

- 태스크 #3의 ID는 10입니다
- 태스크 #4.1의 ID는 12입니다
- 태스크 #3의 끝에서 태스크 #4의 시작으로 향하는 링크의 ID는 1입니다
- 태스크 #4.1의 끝에서 태스크 #3의 시작으로 향하는 링크의 ID는 2입니다

*gantt.findCycles* 메서드는 다음 값을 반환합니다:

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
- [isCircularLink](api/method/iscircularlink.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)

### Related Guides
- [자동 스케줄링](guides/auto-scheduling.md)

### Change log
- 버전 4.1 에 추가됨