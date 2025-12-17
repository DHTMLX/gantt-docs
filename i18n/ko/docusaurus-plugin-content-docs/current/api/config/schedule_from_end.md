---
sidebar_label: schedule_from_end
title: schedule_from_end config
description: "역방향 스케줄링 활성화"
---

# schedule_from_end
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 역방향 스케줄링 활성화

@signature: schedule_from_end: boolean

### Example

~~~jsx
gantt.config.schedule_from_end = true;
gantt.config.project_end = new Date(2019, 4, 1);
~~~

**Default value:** false

### Related samples
- [Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

### Details


이 옵션을 `true`로 설정하면 자동 스케줄링 모드가 '가능한 한 늦게(as late as possible)'로 전환됩니다.

이 설정은 [project_end](api/config/project_end.md)가 함께 지정된 경우에만 적용됩니다.

### Related API
- [project_end](api/config/project_end.md)

### Related Guides
- [자동 스케줄링](guides/auto-scheduling.md)

