---
sidebar_label: auto_scheduling_strict
title: auto_scheduling_strict config
description: "작업이 매번 가능한 가장 빠른 날짜로 다시 일정이 조정되는 자동 스케줄링 모드를 활성화합니다."
---

# auto_scheduling_strict
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 작업이 매번 가능한 가장 빠른 날짜로 다시 일정이 조정되는 자동 스케줄링 모드를 활성화합니다.

@signature: auto_scheduling_strict: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_strict = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 이 설정은 **auto_scheduling** 확장의 일부이므로, [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인이 활성화되어 있는지 확인하세요. 자세한 내용은 [자동 스케줄링](guides/auto-scheduling.md) 문서를 참고하시기 바랍니다.<br>

버전 6.1.0부터 7.1.3까지는 이 설정이 작동하려면 [auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md) 옵션이 활성화되어 있어야 한다는 점을 유의하세요. 
:::

일반적으로 작업은 새로운 날짜가 제약 조건을 위반할 때만 다시 일정이 조정됩니다.

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
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

