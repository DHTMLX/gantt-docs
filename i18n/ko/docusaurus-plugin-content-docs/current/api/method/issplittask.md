---
sidebar_label: isSplitTask
title: isSplitTask method
description: "주어진 작업이 분할된 작업인지 여부를 결정합니다."
---

# isSplitTask
:::info
이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 주어진 작업이 분할된 작업인지 여부를 결정합니다.

@signature: isSplitTask: (task: Task) =\> boolean

### Parameters

- `task` - (required) *Task* - 확인할 작업 객체

### Returns
- ` isSplit` - (boolean) - 작업이 분할된 경우 true, 그렇지 않으면 false를 반환합니다.

### Example

~~~jsx
const task = gantt.getTask(13);
// --> { id: 13, render:"split", text: "Task #2", ...}

if(gantt.isSplitTask(task)){
  // 작업이 분할된 경우 실행할 코드
}
~~~


### Related Guides
- [작업 분할](guides/split-tasks.md)
