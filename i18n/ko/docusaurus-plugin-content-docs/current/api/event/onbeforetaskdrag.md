---
sidebar_label: onBeforeTaskDrag
title: onBeforeTaskDrag event
description: "사용자가 마우스 버튼을 누르고 드래그를 시작했지만, dhtmlxGantt가 드래그 앤 드롭 작업을 시작하기 전"
---

# onBeforeTaskDrag

### Description

@short: 사용자가 마우스 버튼을 누르고 드래깅을 시작했지만, dhtmlxGantt가 드래그 앤 드롭 작동을 시작하기 전 시점에 발생합니다

@signature: onBeforeTaskDrag: (id: string | number, mode: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 태스크 ID
- `mode` - (required) *string* - 드래그 앤 드롭 모드 ("resize", "progress", "move", "ignore")
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Returns
- `result` - (boolean) - 기본 이벤트 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소될지 여부를 정의합니다 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    // 여기에 코드 작성
    return true;
});
~~~

### Related samples
- [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)

### Details

이벤트는 사용자가 타임라인 영역에서 작업을 드래그할 때 발생합니다.

이벤트는 차단 가능합니다. *false*를 반환하면 작업이 초기 위치로 되돌아갑니다.

### Related API
- [drag_mode](api/config/drag_mode.md)
- [onAfterTaskDrag](api/event/onaftertaskdrag.md)
- [onBeforeTaskChanged](api/event/onbeforetaskchanged.md)

### Related Guides
- [Dragging Tasks within the Timeline](guides/dnd.md)