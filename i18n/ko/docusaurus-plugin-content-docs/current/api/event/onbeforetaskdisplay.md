---
sidebar_label: onBeforeTaskDisplay
title: onBeforeTaskDisplay event
description: "태스크가 Gantt 차트에 로드된 직후, 화면에 표시되기 바로 전에 트리거됩니다"
---

# onBeforeTaskDisplay

### Description

@short: 태스크가 Gantt 차트에 로드된 직후, 화면에 표시되기 바로 전에 트리거됩니다

@signature: onBeforeTaskDisplay: (id: string | number, task: Task) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 태스크 ID
- `task` - (required) *Task* - 태스크 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작을 진행할지(<b>true</b>) 중단할지(<b>false</b>) 제어합니다

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

이 이벤트는 차단할 수 있습니다. false를 반환하면 태스크가 차트에 표시되지 않습니다.

### Related API
- [onBeforeLinkDisplay](api/event/onbeforelinkdisplay.md)

### Related Guides
- [작업 필터링](guides/filtering.md)

