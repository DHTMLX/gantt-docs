---
sidebar_label: attachEvent
title: "attachEvent 메서드"
description: "dhtmlxGantt의 내부 이벤트에 핸들러를 연결합니다"
---

# attachEvent

### Description

@short: dhtmlxGantt의 내부 이벤트에 핸들러를 연결합니다

@signature: attachEvent: \<T extends keyof GanttEventCallback\>(event: T, handler: GanttEventCallback[T], settings?: HandlerSettings) =\> string

### Parameters

- `name` - (required) *string* - 이벤트의 이름, 대소문자 구분 없이
- `handler` - (required) *function* - 핸들러 함수
- `settings` - (optional) *HandlerSettings* - 선택사항, 이벤트 핸들러의 설정이 들어 있는 객체

### Returns
- `event_id` - (string) - 연결된 이벤트 핸들러의 식별자

### Example

~~~jsx
gantt.attachEvent("onTaskClick", (id, e) => {
    alert(`You've just clicked an item with id=${id}`);
});
~~~

### Related samples
- [D'n'D Events](https://docs.dhtmlx.com/gantt/samples/08_api/01_dnd_events.html)

### Details

여러 핸들러를 같은 이벤트에 연결할 수 있으며, 이들 모두가 실행됩니다.
일부 핸들러가 *false* 를 반환하면 관련 작업이 차단됩니다.
이벤트 핸들러는 연결된 순서대로 처리됩니다.

## 설정 객체의 속성

설정 객체에는 다음 속성들이 들어 있을 수 있습니다:

- `id?` - (*string | number*) - 이벤트 핸들러의 식별자.
예를 들어, 특정 이벤트에서 핸들러를 쉽게 분리(detach)할 수 있습니다:

~~~js {3}
gantt.attachEvent("onTaskClick", () => {
    console.log("task click");
}, { id: "my-click" });

// 잠시 후
gantt.detachEvent("my-click");
~~~

- `once?` - (*boolean*) - 이벤트가 한 번만 실행될지 여부를 정의합니다.
첫 번째 트리거를 포착하려면 true로 설정합니다:

~~~js {4}
gantt.attachEvent("onTaskClick", () => {
    console.log("capture next task click");
    return true;
}, { once: true });
~~~

- `thisObject?` - (*any*) -리스너의 `this` 객체를 지정합니다.

~~~js {4}
gantt.attachEvent("onTaskClick", function() {
    // ...
    return true;
}, { thisObject: this });
~~~

### Related API
- [detachEvent](api/method/detachevent.md)

### Related Guides
- [Event Handling](guides/handling-events.md)