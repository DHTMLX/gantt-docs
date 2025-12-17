---
sidebar_label: onBeforeSplitTaskDisplay
title: onBeforeSplitTaskDisplay event
description: "분할 작업의 세그먼트가 간트 차트에 표시되기 직전에 트리거됩니다."
---

# onBeforeSplitTaskDisplay

### Description

@short: 분할 작업의 세그먼트가 간트 차트에 표시되기 직전에 트리거됩니다.

@signature: onBeforeSplitTaskDisplay: (id: number | string, task: Task, parent: any) =\> boolean;

### Parameters

- `id` - (required) *number | string* - 서브태스크의 식별자
- `task` - (required) *Task* - 서브태스크 객체
- `parent` - (required) *object* - 부모 작업 객체

### Returns
- ` result` - (boolean) - 분할 작업의 서브태스크를 페이지에 표시할지(<b>true</b>) 숨길지(<b>false</b>) 여부

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

![split tasks](/img/split_tasks.png)

분할 작업을 렌더링할 때, 먼저 부모 작업(속성 *render:"split"*이 설정된 작업)에 대해 [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) 이벤트가 발생합니다. 그 직후, "onBeforeSplitTaskDisplay"가 각 서브태스크에 대해 실행됩니다. "onBeforeSplitTaskDisplay"에서 *false*를 반환하면 해당 서브태스크는 표시되지 않습니다.

:::note

**Related example:** [Filter split tasks](https://snippet.dhtmlx.com/3q1yd7iz)

:::

### Related Guides
- [작업 분할](guides/split-tasks.md)

### Change log
- v8.0에 추가됨

