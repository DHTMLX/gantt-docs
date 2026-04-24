---
sidebar_label: onBeforeTaskDisplay
title: onBeforeTaskDisplay event
description: "작업이 Gantt 차트에 로드된 직후에 실행되지만, 화면에 표시되기 전 단계에서 발생합니다"
---

# onBeforeTaskDisplay

### Description

@short: 작업이 Gantt 차트에 로드된 직후에 실행되지만, 화면에 표시되기 전 단계에서 발생합니다

@signature: onBeforeTaskDisplay: (id: string | number, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 작업 ID
- `task` - (required) *Task* - 작업 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소될지 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
    if (task.priority == "high"){
        return true;
    }
    return false;
});
~~~

### Details

이벤트는 차단 가능합니다. false를 반환하면 작업이 화면에 표시되지 않게 됩니다

### Related API
- [onBeforeLinkDisplay](api/event/onbeforelinkdisplay.md)

### Related Guides
- [Filtering Tasks](guides/filtering.md)