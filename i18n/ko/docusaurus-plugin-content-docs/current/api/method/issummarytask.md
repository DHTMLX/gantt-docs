---
sidebar_label: isSummaryTask
title: isSummaryTask 메서드
description: "지정된 작업이 요약인지 확인합니다"
---

# isSummaryTask

:::info
이 메서드는 PRO 버전에서만 작동합니다. 작업의 유형을 지정하는 기능은 해당 버전에서만 제공됩니다. 그렇지 않으면 메서드는 false를 반환합니다.
:::

### Description

@short: 지정된 작업이 요약인지 확인

@signature: isSummaryTask: (task: Task) =\> boolean

### Parameters

- `task` - (필수) *Task* - 작업 객체

### Returns
- ` mode` - (boolean) - <i>true</i>, 작업이 요약일 경우. 그렇지 않으면, <i>false</i>

### Example

~~~jsx
const task = gantt.getTask(10);
gantt.isSummaryTask(task); // ->거짓
~~~

### Related Guides
- [Task Types](guides/task-types.md)