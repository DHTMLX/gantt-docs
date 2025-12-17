---
sidebar_label: isCircularLink
title: isCircularLink method
description: "링크가 순환하는지 확인합니다."
---

# isCircularLink
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 링크가 순환하는지 확인합니다.

@signature: isCircularLink: (link: Link) =\> boolean

### Parameters

- `link` - (required) *Link* - 링크 객체

### Returns
- ` state` - (boolean) - 링크가 순환하면 true, 그렇지 않으면 false를 반환합니다.

### Example

~~~jsx
var isCircular = gantt.isCircularLink(link);
~~~

### Related samples
- [Auto Scheduling extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/12_auto_scheduling.html)

### Details


:::note
 이 메서드는 [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related API
- [auto_scheduling](api/config/auto_scheduling.md)
- [auto_scheduling_descendant_links](api/config/auto_scheduling_descendant_links.md)
- [auto_scheduling_initial](api/config/auto_scheduling_initial.md)
- [auto_scheduling_move_projects](api/config/auto_scheduling_move_projects.md)
- [auto_scheduling_project_constraint](api/config/auto_scheduling_project_constraint.md)
- [auto_scheduling_strict](api/config/auto_scheduling_strict.md)
- [auto_scheduling_use_progress](api/config/auto_scheduling_use_progress.md)
- [findCycles](api/method/findcycles.md)
- [onAfterAutoSchedule](api/event/onafterautoschedule.md)
- [onAfterTaskAutoSchedule](api/event/onaftertaskautoschedule.md)
- [onBeforeAutoSchedule](api/event/onbeforeautoschedule.md)
- [onBeforeTaskAutoSchedule](api/event/onbeforetaskautoschedule.md)
- [onAutoScheduleCircularLink](api/event/onautoschedulecircularlink.md)
- [onCircularLinkError](api/event/oncircularlinkerror.md)

### Related Guides
- [자동 스케줄링](guides/auto-scheduling.md)

### Change log
- 버전 4.1에 추가됨

