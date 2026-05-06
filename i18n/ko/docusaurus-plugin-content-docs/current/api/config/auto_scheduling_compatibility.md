---
sidebar_label: auto_scheduling_compatibility
title: Auto_scheduling_compatibility 구성
description: "작업의 시간 제약 사용 비활성화"
---

# auto_scheduling_compatibility

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::

:::warning
이 속성은 v9.1에서 더 이상 사용되지 않으며, [gantt.config.auto_scheduling](api/config/auto_scheduling.md#apply_constraints) 의 `apply_constraints` 속성을 사용하십시오.
:::

### Description

@short: 작업의 시간 제약 사용 비활성화

@signature: auto_scheduling_compatibility: boolean

### Example

~~~jsx
gantt.config.auto_scheduling_compatibility = true;
~~~

**Default value:** false

### Details

:::note
이 구성은 **auto_scheduling** 확장에 정의되어 있으므로 [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인을 활성화해야 합니다. [Auto Scheduling](guides/auto-scheduling.md) 문서에서 세부 내용을 확인해 보세요.
:::

시간 제약 기능은 Gantt의 자동 스케줄링 로직을 개선하기 위해 v6.1에서 도입되었습니다.
**auto_scheduling_compatibility** 구성이 이전 버전과의 호환성을 제공하기 위해 추가되었습니다([guides/auto-scheduling.md#version-compatibility](guides/auto-scheduling.md#version-compatibility)).

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)

### Change log
- v6.1에서 이전 버전과의 호환성을 위해 추가되었습니다