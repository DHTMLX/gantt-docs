---
sidebar_label: auto_scheduling_compatibility
title: auto_scheduling_compatibility config
description: "작업의 시간 제약 조건 사용을 끕니다"
---

# auto_scheduling_compatibility
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 작업의 시간 제약 조건 사용을 끕니다

@signature: auto_scheduling_compatibility: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_compatibility = true;
~~~

**Default value:** false

### Details

:::note
 이 설정은 **auto_scheduling** 확장의 일부이므로, [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인을 반드시 활성화해야 합니다. 자세한 내용은 [자동 스케줄링](guides/auto-scheduling.md) 문서를 참고하세요. 
:::

[시간 제약 조건 기능](guides/auto-scheduling.md#timeconstraintsfortasks)은 Gantt의 자동 스케줄링 기능을 향상시키기 위해 버전 6.1에서 도입되었습니다. 
**auto_scheduling_compatibility** 옵션은 [이전 버전과의 호환성을 유지하기 위해](guides/auto-scheduling.md#versioncompatibility) 추가되었습니다.

### Related Guides
- [자동 스케줄링](guides/auto-scheduling.md)

### Change log
- 이전 버전과의 호환성을 지원하기 위해 v6.1에 추가됨
