---
sidebar_label: eventRemove
title: eventRemove method
description: "지정된 HTML 요소에서 이벤트 핸들러를 제거합니다."
---

# eventRemove

### Description

@short: 지정된 HTML 요소에서 이벤트 핸들러를 제거합니다.

@signature: eventRemove: (node: HTMLElement | string, event: string, handler: GanttCallback, options?: boolean | HandlerSettings) =\> void

### Parameters

- `node` - (required) *HTMLElement | string* -            HTML 요소 또는 해당 ID
- `event` - (required) *string* - 이벤트 이름 ('on' 접두어 없이)
- `handler` - (required) *function* - 이벤트를 처리할 함수
- `options` - (optional) *boolean | HandlerSettings* -                선택 사항, <i>useCapture</i> 플래그 또는 <i>options</i> 객체. [자세한 내용 보기](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)

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

