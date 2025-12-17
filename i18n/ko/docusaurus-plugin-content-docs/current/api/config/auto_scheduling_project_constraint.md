---
sidebar_label: auto_scheduling_project_constraint
title: auto_scheduling_project_constraint config
description: "작업이 상위 프로젝트로부터 제약 조건 유형을 상속받을지 여부를 제어합니다."
---

# auto_scheduling_project_constraint
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 작업이 상위 프로젝트로부터 제약 조건 유형을 상속받을지 여부를 제어합니다.

@signature: auto_scheduling_project_constraint: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_project_constraint = true;
~~~

**Default value:** false

### Related samples
- [Auto-Schedule From Project Start & Constraints](https://docs.dhtmlx.com/gantt/samples/02_extensions/19_constraints_scheduling.html)

### Details


:::note
 이 설정은 **auto_scheduling** 확장의 일부이므로, [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인이 활성화되어 있는지 확인하세요. 자세한 내용은 [자동 스케줄링](guides/auto-scheduling.md) 문서를 참고하시기 바랍니다. 
:::

기본적으로 상위 프로젝트에 할당된 제약 조건 유형은 하위 작업의 제약 조건 유형에 영향을 주지 않습니다.

이 옵션을 *true*로 설정하면, 하위 작업이 별도의 제약 조건 유형을 지정하지 않은 경우 상위 프로젝트의 제약 조건 유형(예: **finish no later than**)을 상속받게 됩니다.

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
- v8.0에 추가됨

