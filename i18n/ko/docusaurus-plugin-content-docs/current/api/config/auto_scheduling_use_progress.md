---
sidebar_label: auto_scheduling_use_progress
title: auto_scheduling_use_progress config
description: "완료된 작업을 스케줄링 알고리즘에서 처리하는 방식을 설정합니다."
---

# auto_scheduling_use_progress
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 완료된 작업을 스케줄링 알고리즘에서 처리하는 방식을 설정합니다.

@signature: auto_scheduling_use_progress: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_use_progress = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Details

:::note
 이 설정은 **auto_scheduling** 또는 **critical_path** 확장 기능의 일부입니다. 사용하려면 [auto_scheduling](guides/extensions-list.md#autoscheduling) 또는 [critical_path](guides/extensions-list.md#criticalpath) 플러그인을 활성화해야 합니다. 자세한 내용은 [자동 스케줄링](guides/auto-scheduling.md) 및 [Critical Path](guides/critical-path.md) 문서를 참조하세요. 
:::

이 설정을 활성화하면, MS Project와 유사하게 진행률을 고려하여 크리티컬 패스, 슬랙 및 자동 스케줄링 알고리즘이 작동합니다. 구체적으로는:

1) 완료된 작업(진행률 100%로 표시된 작업)은 항상 슬랙이 0입니다;

2) 완료된 작업은 자동 스케줄링 계산에서 제외됩니다. 완료된 작업과 연결된 선행 작업의 의존성은 무시됩니다;

3) 완료된 작업은 크리티컬 패스의 일부가 될 수 없습니다.

:::note

**Related example:** [자동 스케줄링, 크리티컬 패스 및 슬랙 계산에 진행률 사용](https://snippet.dhtmlx.com/ju3km1uy)

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
- [자동 스케줄링](guides/auto-scheduling.md)
- [Critical Path](guides/critical-path.md)

### Change log
- v8.0에서 추가됨

