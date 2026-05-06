---
sidebar_label: auto_scheduling_move_projects
title: auto_scheduling_move_projects 구성
description: "전체 프로젝트가 이동될지 여부를 정의합니다(아래 세부 정보를 참조하십시오)"
---

# auto_scheduling_move_projects

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::

:::warning
The property has been deprecated in v9.1, use the `move_projects` property of [gantt.config.auto_scheduling](api/config/auto_scheduling.md#move_projects) instead.
:::

### Description

@short: 전체 프로젝트가 이동될지 여부를 정의합니다(아래 세부 정보를 참조하십시오)

@signature: auto_scheduling_move_projects: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_move_projects = true;

gantt.init("gantt_here");
~~~

**Default value:** true


### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details

:::note
이 설정은 **auto_scheduling** 확장에서 정의되므로 [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인을 활성화해야 합니다. 자세한 내용은 [Auto Scheduling](guides/auto-scheduling.md) 문서를 참조하십시오. 
:::

By default (when the property is set to *true*), the whole project is moved during auto scheduling. It means that all tasks in the project remain on their places relative to each other and the beginning of the project.

![moving_project_true](/img/moving_project_true.png)

If the *auto_scheduling_move_projects* is set to *false*, auto scheduling will move separate tasks inside of the project. Thus, some tasks will be moved, others will remain on their places.

![moving_project_false](/img/moving_project_false.png)

:::note
if you use constraint scheduling (*gantt.config.auto_scheduling_compatibility = false*), the *auto_scheduling_move_projects* config will be active only when the strict mode is disabled:
:::

~~~js
gantt.config.auto_scheduling_compatibility = false;
gantt.config.auto_scheduling_strict = false;
~~~

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
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
- 이 속성은 v9.1에서 더 이상 사용되지 않습니다
- 버전 4.1에 추가되었습니다