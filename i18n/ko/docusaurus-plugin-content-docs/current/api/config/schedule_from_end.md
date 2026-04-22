---
sidebar_label: schedule_from_end
title: schedule_from_end 설정
description: "역방향 스케줄링 활성화"
---

# schedule_from_end
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

:::warning
이 속성은 v9.1에서 더 이상 사용되지 않으며, 대신 [gantt.config.auto_scheduling](api/config/auto_scheduling.md#schedule_from_end) 의 `schedule_from_end` 속성을 사용하십시오.
:::
### Description

@short: 역방향 스케줄링 활성화

@signature: schedule_from_end: boolean

### Example

~~~jsx
gantt.config.schedule_from_end = true;
gantt.config.project_end = new Date(2025, 10, 1);
~~~

**Default value:** 기본값은 false

### Related samples
- [프로젝트 엔드에서 자동 스케줄링(역방향)](https://docs.dhtmlx.com/gantt/samples/02_extensions/20_backwards_scheduling.html)

### Details

이 구성을 `true`로 설정하면 자동 스케줄링이 `as late as possible` 모드로 전환됩니다.

이 값은 [project_end](api/config/project_end.md) 가 함께 지정된 경우에만 적용됩니다.

### Related API
- [project_end](api/config/project_end.md)
- [auto_scheduling](api/config/auto_scheduling.md)

### Related Guides
- [자동 스케줄링](guides/auto-scheduling.md)

### Change log
- 이 속성은 v9.1에서 더 이상 사용되지 않습니다