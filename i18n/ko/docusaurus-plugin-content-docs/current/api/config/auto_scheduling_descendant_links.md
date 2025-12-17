---
sidebar_label: auto_scheduling_descendant_links
title: auto_scheduling_descendant_links config
description: "상위 작업(프로젝트)에서 하위 작업으로 링크를 생성할 수 있는지 여부를 제어합니다."
---

# auto_scheduling_descendant_links
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 상위 작업(프로젝트)에서 하위 작업으로 링크를 생성할 수 있는지 여부를 제어합니다.

@signature: auto_scheduling_descendant_links: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_descendant_links = true;
 
gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details


:::note
 이 설정은 **auto_scheduling** 확장의 일부이므로, [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인을 반드시 활성화해야 합니다. 자세한 내용은 [자동 스케줄링](guides/auto-scheduling.md) 문서를 참조하세요. 
:::


기본적으로 상위 작업(프로젝트)에서 하위 작업으로 링크를 생성하는 것은 허용되지 않습니다.

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
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
- 버전 4.0에 추가됨

