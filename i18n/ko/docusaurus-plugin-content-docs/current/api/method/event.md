---
sidebar_label: event
title: event method
description: "HTML 요소에 이벤트 핸들러를 설정합니다"
---

# event

### Description

@short: HTML 요소에 이벤트 핸들러를 설정합니다

@signature: event: (node: HTMLElement | string, event: string, handler: GanttCallback, options?: boolean | HandlerSettings) =\> void

### Parameters

- `node` - (required) *HTMLElement | string* -            HTML 요소 또는 해당 요소의 id
- `event` - (required) *string* - 이벤트 이름 ('on' 접두사 제외)
- `handler` - (required) *function* - 이벤트를 처리할 함수
- `options` - (optional) *boolean | HandlerSettings* -                선택 사항, <i>useCapture</i> 또는 <i>options</i> 파라미터 값입니다. [자세한 정보](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

### Example

~~~jsx
// 'onclick' 이벤트에 핸들러 추가
gantt.event("divId", "click", function(event){
    // e - DOM 이벤트 객체
    do_something();
}, options);
~~~

### Details

[event](api/method/event.md)를 통해 추가된 모든 이벤트 리스너는 [destructor](api/method/destructor.md)가 호출될 때 자동으로 제거됩니다.

### Related API
- [eventRemove](api/method/eventremove.md)

### Related Guides
- [이벤트 처리](guides/handling-events.md)

### Change log
- 버전 4.0에서 추가됨

