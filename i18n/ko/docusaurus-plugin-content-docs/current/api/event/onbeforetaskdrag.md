---
sidebar_label: onBeforeTaskDrag
title: onBeforeTaskDrag event
description: "사용자가 마우스 버튼을 누르고 드래그를 시작한 직후, dhtmlxGantt가 드래그 앤 드롭 프로세스를 시작하기 전에 발생합니다."
---

# onBeforeTaskDrag

### Description

@short: 사용자가 마우스 버튼을 누르고 드래그를 시작한 직후, dhtmlxGantt가 드래그 앤 드롭 프로세스를 시작하기 전에 발생합니다.

@signature: onBeforeTaskDrag: (id: string | number, mode: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 작업 ID
- `mode` - (required) *string* - 드래그 앤 드롭 모드 ("resize", "progress", "move", "ignore")
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Returns
- ` result` - (boolean) - 기본 이벤트 동작이 진행될지(<b>true</b>) 또는 차단될지(<b>false</b>) 결정합니다.

### Example

~~~jsx
gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
    //여기에 커스텀 로직 작성
    return true;
});
~~~

### Related samples
- [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)

### Details

이 이벤트는 타임라인 내에서 작업이 드래그될 때 발생합니다.

*false*를 반환하면 이벤트가 차단되어 작업이 원래 위치로 리셋됩니다.

### Related API
- [drag_mode](api/config/drag_mode.md)
- [onAfterTaskDrag](api/event/onaftertaskdrag.md)
- [onBeforeTaskChanged](api/event/onbeforetaskchanged.md)

### Related Guides
- [타임라인 내에서 작업 드래그하기](guides/dnd.md)

