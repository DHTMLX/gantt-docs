---
sidebar_label: auto_scheduling_descendant_links
title: auto_scheduling_descendant_links config
description: "Allows or forbids creating links from parent tasks (projects) to their children"
---

# auto_scheduling_descendant_links

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

:::warning
이 속성은 v9.1에서 더 이상 사용되지 않습니다. 대신 [gantt.config.auto_scheduling](api/config/auto_scheduling.md#descendant_links)의 `descendant_links` 속성을 사용하세요.
:::

### Description

@short: 부모 작업(프로젝트)에서 자식 작업으로의 링크 생성을 허용하거나 금지합니다

@signature: auto_scheduling_descendant_links: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_descendant_links = true;
 
gantt.init("gantt_here");
~~~

**기본값:** false

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
이 구성은 **auto_scheduling** 확장에 정의되어 있으므로 [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인을 활성화해야 합니다. 자세한 내용은 [Auto Scheduling](guides/auto-scheduling.md) 문서를 참조하십시오.
:::

기본적으로 부모 작업(프로젝트)에서 자식으로의 링크를 생성할 수 없습니다.

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
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- 이 속성은 v9.1에서 더 이상 사용되지 않습니다.
- 버전 4.0에서 추가되었습니다.