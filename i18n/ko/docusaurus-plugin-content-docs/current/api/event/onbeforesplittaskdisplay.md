--- 
sidebar_label: onBeforeSplitTaskDisplay
title: onBeforeSplitTaskDisplay 이벤트
description: "Gantt 차트에 분할 작업의 일부가 표시되기 전에 발생합니다"
---

# onBeforeSplitTaskDisplay

### Description

@short: Gantt 차트에 분할 작업의 일부가 표시되기 전에 발생합니다

@signature: onBeforeSplitTaskDisplay: (id: number | string, task: Task, parent: any) =\> boolean;

### Parameters

- `id` - (required) *number | string* - 하위 작업의 ID
- `task` - (required) *Task* - 하위 작업의 객체
- `parent` - (required) *object* - 상위 작업의 객체

### Returns
- ` result` - (boolean) - 분할 작업의 하위 작업이 페이지에 표시될지 여부를 정의합니다 (<b>true</b>) 또는 그렇지 않으면 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeSplitTaskDisplay", function (id, task, parent) {
    if (task.duration < 3) {
        return false;
    }
    return true;
});
~~~

### Details

![분할 작업](/img/split_tasks.png)

분할 작업이 렌더링되면 먼저 상위 항목에 대해 [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) 이벤트가 발생합니다( *render:"split"*인 태스크). 그런 다음 각 하위 작업에 대해 "onBeforeSplitTaskDisplay"가 실행됩니다. "onBeforeSplitTaskDisplay"에서 *false*를 반환하면 하위 작업이 화면에 표시되지 않습니다.

:::note
샘플: [필터 분할 작업](https://snippet.dhtmlx.com/3q1yd7iz)
:::

### Related Guides
- [분할 작업](/guides/split-tasks/)

### Change log
- v8.0에서 추가됨