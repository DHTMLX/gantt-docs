---
sidebar_label: auto_scheduling_initial
title: auto_scheduling_initial config
description: "데이터가 로드되거나 파싱될 때 간트가 자동 스케줄링을 수행할지 여부를 정의합니다."
---

# auto_scheduling_initial
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 데이터가 로드되거나 파싱될 때 간트가 자동 스케줄링을 수행할지 여부를 정의합니다.

@signature: auto_scheduling_initial: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_initial = false;

gantt.init("gantt_here");
~~~

**Default value:** true

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
 이 설정은 **auto_scheduling** 확장의 일부이므로, [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인이 활성화되어 있는지 확인하세요. 자세한 내용은 [자동 스케줄링](guides/auto-scheduling.md) 문서를 참고하시기 바랍니다. 
:::

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
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

