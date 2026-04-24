---
sidebar_label: eventRemove
title: eventRemove 메서드
description: "HTML 요소에서 이벤트 핸들러를 제거합니다"
---

# eventRemove

### Description

@short: HTML 요소에서 이벤트 핸들러를 제거합니다

@signature: eventRemove: (node: HTMLElement | string, event: string, handler: GanttCallback, options?: boolean | HandlerSettings) =\> void

### Parameters

- `node` - (필수) *HTMLElement | string* - HTML 노드 또는 그 아이디
- `event` - (필수) *string* - HTML 이벤트의 이름('on' 접두사 없이)
- `handler` - (필수) *function* - 이벤트 핸들러
- `options` - (선택적) *boolean | HandlerSettings* - useCapture 또는 options 매개변수의 값. 자세한 내용은 아래를 참조하십시오

### Example

~~~jsx
const handler = function(event){
    console.log("event!");
};
var element = document.querySelector(".my-element");

gantt.event(element, "click", handler);

gantt.eventRemove(element, "click", handler);
~~~

### Details

[event](api/method/event.md)를 통해 추가된 모든 이벤트 리스너는 [destructor](api/method/destructor.md)가 호출될 때 자동으로 제거됩니다.

### Related API
- [event](api/method/event.md)

### Related Guides
- [이벤트 처리](guides/handling-events.md)

### Change log
- 버전 4.0에 추가됨

