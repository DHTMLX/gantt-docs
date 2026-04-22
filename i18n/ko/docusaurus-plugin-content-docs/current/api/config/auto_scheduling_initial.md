---
sidebar_label: auto_scheduling_initial
title: auto_scheduling_initial 구성
description: "Gantt가 데이터 로딩/파싱 시 자동 스케줄링을 수행할지 여부를 정의합니다"
---

# auto_scheduling_initial

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::

:::warning
The property has been deprecated in v9.1, use the `schedule_on_parse` property of [gantt.config.auto_scheduling](api/config/auto_scheduling.md#schedule_on_parse) instead.
:::

### Description

@short: Gantt가 데이터 로딩/파싱 시 자동 스케줄링을 수행할지 여부를 정의합니다

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
이 구성은 **auto_scheduling** 확장에 정의되어 있으므로 [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인을 활성화해야 합니다. 자세한 내용은 [Auto Scheduling](guides/auto-scheduling.md) 문서를 참조하십시오.
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
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- 이 속성은 v9.1에서 더 이상 사용되지 않음
- 버전 4.0에서 추가되었습니다