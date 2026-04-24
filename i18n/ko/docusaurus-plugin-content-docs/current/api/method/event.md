---
sidebar_label: event
title: event method
description: "HTML 요소에 이벤트 핸들러를 연결합니다"
---

# event

### Description

@short: HTML 요소에 이벤트 핸들러를 연결합니다

@signature: event: (node: HTMLElement | string, event: string, handler: GanttCallback, options?: boolean | HandlerSettings) =\> void

### Parameters

- `node` - (required) *HTMLElement | string* -  HTML 노드 또는 그 ID
- `event` - (required) *string* -  HTML 이벤트의 이름 ('on' 접두사 없이)
- `handler` - (required) *function* -  이벤트 핸들러
- `options` - (optional) *boolean | HandlerSettings* - 선택적, useCapture 또는 options 매개변수의 값. 자세한 내용은 아래를 참조하십시오.

### Example

~~~jsx
// 'onclick' 이벤트에 대한 핸들러를 추가합니다.
gantt.event("divId", "click", function(event){
    // e - DOM 이벤트 객체
    do_something();
}, options);
~~~

### Details

[ event ](api/method/event.md) 를 사용해 연결된 모든 이벤트 리스너는 [destructor](api/method/destructor.md)가 호출될 때 자동으로 해제됩니다.

### Related API
- [eventRemove](api/method/eventremove.md)

### Related Guides
- [Event Handling](guides/handling-events.md)

### Change log
- 버전 4.0에서 추가됨