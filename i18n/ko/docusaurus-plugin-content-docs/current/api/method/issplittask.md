---
sidebar_label: isSplitTask
title: isSplitTask method
description: "지정된 작업이 분할되었는지 확인"
---

# isSplitTask

:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다.
:::

### Description

@short: 지정된 작업이 분할되었는지 확인

@signature: isSplitTask: (task: Task) =\> boolean

### Parameters

- `task` - (필수) *Task* - 작업 객체

### Returns
- `isSplit` - (boolean) - 작업이 분할되었으면 true, 그렇지 않으면 false

### Example

~~~jsx
const task = gantt.getTask(13);
// --> { id: 13, render:"split", text: "작업 #2", ...}

if(gantt.isSplitTask(task)){
  // 무언가를 수행합니다
}
~~~

### Related Guides
- [Split Tasks](guides/split-tasks.md)