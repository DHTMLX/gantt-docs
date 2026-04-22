---
sidebar_label: auto_scheduling_strict
title: auto_scheduling_strict config
description: "자동 스케줄링 모드를 활성화하며, 이 모드에서는 작업이 항상 가능한 가장 이른 날짜로 재스케줄됩니다"
---

# auto_scheduling_strict

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

:::warning
이 속성은 v9.1에서 더 이상 사용되지 않으며, 대신 [gantt.config.auto_scheduling](api/config/auto_scheduling.md#gap_behavior)의 `gap_behavior` 속성을 사용하십시오.
:::

### Description

@short: 자동 스케줄링 모드를 활성화하며, 이 모드에서는 작업이 항상 가능한 가장 이른 날짜로 재스케줄됩니다

@signature: auto_scheduling_strict: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_strict = true;

gantt.init("gantt_here");
~~~

**기본값:** false

### Related samples
- [자동 스케줄링 확장](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
이 구성은 **auto_scheduling** 확장에 정의되어 있으므로 [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인을 활성화해야 합니다. [자동 스케줄링](guides/auto-scheduling.md) 문서에서 자세한 내용을 읽으십시오.

참고로 버전 6.1.0 - 7.1.3에서는 구성은 [auto_scheduling_compatibility](api/config/auto_scheduling_compatibility.md) 옵션이 활성화될 때만 작동합니다.
:::

기본적으로, 새 날짜가 제약 조건을 위반할 때만 작업이 재스케줄됩니다.

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

### Change log
- 이 속성은 v9.1에서 더 이상 사용되지 않습니다.