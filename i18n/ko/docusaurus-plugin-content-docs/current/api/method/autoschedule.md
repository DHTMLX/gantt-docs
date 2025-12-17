---
sidebar_label: autoSchedule
title: autoSchedule method
description: "프로젝트 일정을 자동으로 업데이트합니다"
---

# autoSchedule
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 프로젝트 일정을 자동으로 업데이트합니다

@signature: autoSchedule: (taskId?: string | number) =\> void

### Parameters

- `taskId` - (optional) *string | number* -        선택 사항, 작업 ID

### Example

~~~jsx
gantt.autoSchedule();
~~~

### Details

특정 작업부터 일정을 업데이트하려면, **autoSchedule()** 메서드에 해당 작업의 ID를 인수로 전달하면 됩니다:

~~~js
gantt.autoSchedule(taskId);
~~~


:::note
 이 메서드를 사용하려면 [auto_scheduling](guides/extensions-list.md#autoscheduling) 플러그인이 페이지에 포함되어 있어야 합니다. 
:::

### Related Guides
- [자동 스케줄링](guides/auto-scheduling.md)
