---
sidebar_label: auto_scheduling_use_progress
title: auto_scheduling_use_progress config
description: "스케줄링 알고리즘이 완료된 작업을 처리하는 방식을 설정합니다"
---

# auto_scheduling_use_progress

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::

:::warning
The property has been deprecated in v9.1, use the `use_progress` property of [gantt.config.auto_scheduling](api/config/auto_scheduling.md#use_progress) instead.
:::

### Description

@short: 스케줄링 알고리즘이 완료된 작업을 처리하는 방식을 설정합니다

@signature: auto_scheduling_use_progress: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_use_progress = true;

gantt.init("gantt_here");
~~~

**Default value:** false


### Details

:::note
이 구성은 **auto_scheduling** 또는 **critical_path** 확장에 정의되므로 [auto_scheduling](guides/extensions-list.md#autoscheduling) 또는 [critical_path](guides/extensions-list.md#critical-path) 플러그인 중 하나를 활성화해야 합니다. Auto Scheduling 및 Critical Path 문서에서 자세한 내용을 확인하십시오. 
:::

정의가 활성화되면, 크리티컬 패스, Slack 및 자동 스케줄링 알고리즘은 작업 진행률 값을 고려하게 됩니다. 이는 MS Project에서 이들 메서드가 작동하는 방식과 유사합니다, 즉:

1) 완료된 작업(진행률이 100%인 작업)은 항상 슬랙이 0입니다;

2) 완료된 작업은 auto_scheduling 계산에서 제외됩니다. 선행 작업과 완료된 작업을 연결하는 관계는 무시됩니다;

3) 완료된 작업은 크리티컬로 간주될 수 없습니다.

:::note
샘플: [자동 스케줄링, 크리티컬 패스 및 슬랙 계산에 진행 상황 사용](https://snippet.dhtmlx.com/ju3km1uy )
:::

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
- [auto_scheduling_strict](api/config/auto_scheduling_strict.md)
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
- [Critical Path](guides/critical-path.md)

### Change log
- 이 속성은 v9.1에서 더 이상 사용되지 않습니다
- v8.0에서 추가되었습니다