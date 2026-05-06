---
sidebar_label: auto_scheduling_project_constraint
title: auto_scheduling_project_constraint 설정
description: "작업이 상위 프로젝트의 제약 조건 유형을 상속받아야 하는지 여부를 정의합니다"
---

# auto_scheduling_project_constraint

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

:::warning
해당 속성은 v9.1에서 더 이상 사용되지 않습니다. [gantt.config.auto_scheduling](api/config/auto_scheduling.md#project_constraint)의 `project_constraint` 속성을 사용하세요.
:::

### Description

@short: 작업이 상위 프로젝트의 제약 조건 유형을 상속받아야 하는지 여부를 정의합니다

@signature: auto_scheduling_project_constraint: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_project_constraint = true;
~~~

**기본값:** false

### Related samples
- [프로젝트 시작 및 제약 조건에서 자동 스케줄링](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

### Details

:::note
이 구성은 **auto_scheduling** 확장에 정의되어 있으므로 [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인을 활성화해야 합니다. 자세한 내용은 [자동 스케줄링](guides/auto-scheduling.md) 문서를 참조하십시오.
:::


기본적으로 상위 프로젝트의 제약 조건 유형은 중첩된 작업의 제약 조건 유형에 영향을 주지 않습니다.

구성을 *true*로 설정하면 자식 작업은(자신의 제약 조건 유형을 가진 작업은 제외) 상위 프로젝트와 동일한 제약 조건 유형을 갖게 됩니다(예: **finish no later than**).

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
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
- 이 속성은 v9.1에서 더 이상 사용되지 않습니다
- v8.0에 추가되었습니다