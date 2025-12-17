---
sidebar_label: isSummaryTask
title: isSummaryTask method
description: "주어진 작업이 요약 작업인지 확인합니다."
---

# isSummaryTask
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 주어진 작업이 요약 작업인지 확인합니다.

@signature: isSummaryTask: (task: Task) =\> boolean

### Parameters

- `task` - (required) *Task* - 확인할 작업 객체

### Returns
- ` mode` - (boolean) - <i>true</i> 작업이 요약 작업인 경우, 그렇지 않으면 <i>false</i>

### Example

~~~jsx
const task = gantt.getTask(10);
gantt.isSummaryTask(task); // ->false
~~~

### Details

:::note
이 메서드는 작업 유형 정의 기능이 PRO 버전에만 포함되어 있으므로 PRO 버전에서만 사용할 수 있습니다. 다른 버전에서는 항상 false를 반환합니다.
:::

### Related Guides
- [작업 유형](guides/task-types.md)
