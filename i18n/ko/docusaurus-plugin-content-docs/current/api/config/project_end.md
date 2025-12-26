---
sidebar_label: project_end
title: project_end config
description: "프로젝트의 종료 날짜를 설정합니다"
---

# project_end
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 프로젝트의 종료 날짜를 설정합니다

@signature: project_end: Date | undefined

### Example

~~~jsx
gantt.config.project_end = new Date(2019, 2, 1);
~~~

### Related samples
- [Auto-Schedule From Project End (backward)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

### Details

이 설정은 backward scheduling이 켜져 있을 때 새 작업의 기본 종료 날짜로 사용할 수 있습니다.

### Related API
- [schedule_from_end](api/config/schedule_from_end.md)

### Related Guides
- [자동 스케줄링](guides/auto-scheduling.md)

