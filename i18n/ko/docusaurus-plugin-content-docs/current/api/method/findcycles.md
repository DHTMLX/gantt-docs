---
sidebar_label: findCycles
title: findCycles method
description: "차트 내에서 발견된 모든 의존성 루프를 반환합니다."
---

# findCycles

### Description

@short: 차트 내에서 발견된 모든 의존성 루프를 반환합니다.

@signature: findCycles: () =\> any[]

### Returns
- ` cycles` - (array) - 간트 차트에서 감지된 의존성 루프들을 포함하는 배열입니다.

### Example

~~~jsx
var cycles = gantt.findCycles();
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
pronote 이 기능은 PRO 에디션에서만 제공됩니다. 
:::

:::note
note 이 메서드는 [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인이 활성화되어 있어야 합니다. 
:::

*cycles* 배열의 각 항목은 루프를 형성하는 작업들과 링크들의 집합을 나타냅니다.

~~~js
[ 
    { 
        tasks: [//루프에 포함된 작업들의 아이디], 
        links: [//루프에 포함된 링크들의 아이디]
    },
    {
        
        tasks: [...], 
        links: [...]
    }
]
~~~

참고용 예시는 다음과 같습니다:

![on_autoschedule_circular_link](/img/on_autoschedule_circular_link.png)


- 작업 #3의 id는 10입니다.
- 작업 #4.1의 id는 12입니다.
- 작업 #3의 끝에서 작업 #4의 시작으로 연결된 링크의 id는 1입니다.
- 작업 #4.1의 끝에서 작업 #3의 시작으로 연결된 링크의 id는 2입니다.

*gantt.findCycles* 메서드는 다음과 같은 결과를 반환합니다:

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
- version 4.1에 추가됨

