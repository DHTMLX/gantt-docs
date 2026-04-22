---
sidebar_label: autoSchedule
title: autoSchedule 메서드
description: "프로젝트의 일정을 재계산합니다"
---

# autoSchedule

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
::: 

### Description

@short: 프로젝트의 일정을 재계산합니다

@signature: autoSchedule: (taskId?: string | number) =\> void

### Parameters
- `taskId` - (선택 사항) *string | number* - 작업 ID

### Example

~~~jsx
gantt.autoSchedule();
~~~

### Details

연결된 작업 그룹의 일정을 재계산하려면 이 그룹에 속한 작업들 중 하나의 ID를 인수로 전달하여 **autoSchedule()** 메서드를 호출합니다:

~~~js
gantt.autoSchedule(taskId);
~~~

:::note
이 메서드를 사용하려면 페이지에 [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인이 포함되어 있어야 합니다.
:::  

### Related Guides
- [자동 스케줄링](guides/auto-scheduling.md)
