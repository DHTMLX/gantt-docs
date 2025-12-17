---
sidebar_label: attachEvent
title: attachEvent method
description: "dhtmlxGantt의 내부 이벤트에 핸들러를 연결합니다."
---

# attachEvent

### Description

@short: DhtmlxGantt의 내부 이벤트에 핸들러를 연결합니다.

@signature: attachEvent: \<T extends keyof GanttEventCallback\>(event: T, handler: GanttEventCallback[T], settings?: HandlerSettings) =\> string

### Parameters

- `name` - (required) *string* - 이벤트 이름, 대소문자 구분 없음
- `handler` - (required) *function* - 핸들러 함수
- `settings` - (optional) *HandlerSettings* - 선택 사항, 이벤트 핸들러를 위한 [설정 객체](#propertiesofsettingsobject)

### Returns
- `event_id` - (string) - 연결된 이벤트 핸들러의 ID

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("id="+id+"인 항목을 클릭하셨습니다.");
});
~~~

### Related samples
- [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)

### Details

동일한 이벤트에 여러 핸들러를 연결할 수 있으며, 모두 실행됩니다.
핸들러 중 하나라도 *false*를 반환하면 해당 작업이 취소됩니다.
핸들러는 연결된 순서대로 실행됩니다.

설정 객체의 속성
-----------------------
설정 객체는 다음과 같은 속성을 포함할 수 있습니다:

- **id?** - (*string | number*) - 이벤트 핸들러의 식별자입니다.
이를 통해 특정 핸들러를 이벤트에서 쉽게 분리할 수 있습니다:

~~~js
gantt.attachEvent("onTaskClick", function(){
    console.log("task click");
}, {id: "my-click"}); /*!*/
... //나중에:
gantt.detachEvent("my-click");
~~~

- **once?** - (*boolean*) - 이벤트가 한 번만 발생하도록 지정합니다.
이 값을 *true*로 설정하면 이벤트가 처음 발생할 때만 캡처합니다:

~~~js
gantt.attachEvent("onTaskClick", function(){
    console.log("다음 task click을 캡처합니다");
    return true;
}, {once: true}); /*!*/
~~~

- **thisObject?** - (*any*) - 이벤트 리스너의 `this` 컨텍스트를 정의합니다.

~~~js
gantt.attachEvent("onTaskClick", function(){
    // ...
    return true;
}, {thisObject: this}); /*!*/
~~~

### Related API
- [detachEvent](api/method/detachevent.md)

### Related Guides
- [이벤트 처리](guides/handling-events.md)

