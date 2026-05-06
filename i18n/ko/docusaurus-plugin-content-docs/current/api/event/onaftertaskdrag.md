---
sidebar_label: onAfterTaskDrag
title: onAfterTaskDrag event
description: "사용자가 드래그를 완료하고 마우스 버튼을 놓은 직후에 발생합니다"
---

# onAfterTaskDrag

### Description

@short: 사용자가 드래그를 완료하고 마우스 버튼을 놓은 직후에 발생합니다

@signature: onAfterTaskDrag: (id: string | number, mode: string, e: Event) =\> void;

### Parameters

- `id` - (필수) *string | number* - 태스크 ID
- `mode` - (필수) *string* - 드래그 앤 드롭 모드 ("resize", "progress", "move", "ignore")
- `e` - (필수) *Event* - 네이티브 이벤트 객체

### Example

~~~jsx
gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
    // 여기에 코드 작성
});
~~~

### Details

타임라인 영역에서 태스크를 드래그할 때 이벤트가 발생합니다.

### Related API
- [drag_mode](api/config/drag_mode.md)
- [onBeforeTaskDrag](api/event/onbeforetaskdrag.md)
- [onBeforeTaskChanged](api/event/onbeforetaskchanged.md)