---
sidebar_label: onAfterTaskDrag
title: onAfterTaskDrag event
description: "사용자가 드래그를 완료하고 마우스 버튼을 놓을 때 한 번 발생합니다."
---

# onAfterTaskDrag

### Description

@short: 사용자가 드래그를 완료하고 마우스 버튼을 놓을 때 한 번 발생합니다.

@signature: onAfterTaskDrag: (id: string | number, mode: string, e: Event) =\> void;

### Parameters

- `id` - (required) *string | number* - 작업(task) ID
- `mode` - (required) *string* - 드래그 앤 드롭 모드 ("resize", "progress", "move", "ignore")
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
    //여기에 사용자 정의 로직 작성
});
~~~

### Details

이 이벤트는 타임라인 영역 내에서 작업이 드래그된 후 발생합니다.

### Related API
- [drag_mode](api/config/drag_mode.md)
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- [onBeforeTaskChanged](api/event/onbeforetaskchanged.md)

