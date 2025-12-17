---
sidebar_label: auto_scheduling_move_projects
title: auto_scheduling_move_projects config
description: "스케줄링 시 전체 프로젝트가 이동할지 여부를 정의합니다 (자세한 내용은 아래 참조)."
---

# auto_scheduling_move_projects
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 스케줄링 시 전체 프로젝트가 이동할지 여부를 정의합니다 (자세한 내용은 아래 참조).

@signature: auto_scheduling_move_projects: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_move_projects = true;

gantt.init("gantt_here");
~~~

**Default value:** true

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details


:::note
 이 설정은 **auto_scheduling** 확장의 일부이므로, [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인이 활성화되어 있는지 확인하세요. 자세한 내용은 [자동 스케줄링](guides/auto-scheduling.md) 문서에서 확인할 수 있습니다. 
:::


버전 4.1에 추가됨

기본값으로 (이 속성이 *true*로 설정된 경우) 전체 프로젝트가 자동 스케줄링 중에 이동합니다. 이는 모든 작업이 서로 및 프로젝트 시작 시점과 동일한 순서를 유지함을 의미합니다.

![moving_project_true](/img/moving_project_true.png)

*auto_scheduling_move_projects*가 *false*로 설정되면, 자동 스케줄링은 프로젝트 내 개별 작업들을 조정합니다. 결과적으로 일부 작업은 이동하고, 일부 작업은 그대로 유지됩니다.

![moving_project_false](/img/moving_project_false.png)

<br>
**참고**, 제약 조건 스케줄링(*gantt.config.auto_scheduling_compatibility = false*)을 사용할 때는 *auto_scheduling_move_projects* 설정이 엄격 모드가 꺼져 있을 때만 적용됩니다:

~~~js
gantt.config.auto_scheduling_compatibility = false;
gantt.config.auto_scheduling_strict = false;
~~~

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
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
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- [자동 스케줄링](guides/auto-scheduling.md)

