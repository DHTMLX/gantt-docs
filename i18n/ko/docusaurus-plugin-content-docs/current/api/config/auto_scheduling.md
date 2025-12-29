---
sidebar_label: auto_scheduling
title: auto_scheduling config
description: "자동 스케줄링 활성화"
---

# auto_scheduling
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 자동 스케줄링 활성화

@signature: auto_scheduling: boolean | AutoSchedulingConfig

### Example

~~~jsx
gantt.config.auto_scheduling = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
이 설정은 **auto_scheduling** 확장의 일부이므로, [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인을 반드시 활성화해야 합니다. 자세한 내용은 [자동 스케줄링](guides/auto-scheduling.md) 문서를 참고하세요. 
:::


`auto_scheduling` 옵션은 boolean 값 또는 객체 형태로 설정할 수 있으며, 객체를 사용할 경우 자동 스케줄링 동작에 대해 더 세밀한 제어가 가능합니다. 객체 사용 시 다음과 같은 설정을 할 수 있습니다:

- **enabled** - (*boolean*) - 자동 스케줄링을 켜거나 끄는 설정으로, boolean 값을 직접 설정하는 것과 동일합니다.
- **show_constraints?** - (*boolean*) - 간트 차트에서 작업 제약 조건을 표시할지 여부를 관리합니다.
`true`로 설정하면 제약 조건이 표시되고, `false`로 설정하면 숨겨집니다.

예를 들어, 자동 스케줄링은 켜고 작업 제약 조건은 숨기려면 다음과 같이 설정합니다:

~~~js
gantt.config.auto_scheduling = {
  enabled: true,
  show_constraints: false
};
gantt.init("gantt_here");
~~~

### Related API
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
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
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)

### Related Guides
- [자동 스케줄링](guides/auto-scheduling.md)

### Change log
- 버전 9.0부터 이 설정은 객체 형태로 정의할 수 있습니다

