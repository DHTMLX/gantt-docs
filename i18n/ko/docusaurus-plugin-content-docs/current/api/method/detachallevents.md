---
sidebar_label: detachAllEvents
title: detachAllEvents method
description: "dhtmlxGantt에서 모든 이벤트를 제거합니다 (커스텀 이벤트와 내장 이벤트 모두 포함)"
---

# detachAllEvents

### Description

@short: DhtmlxGantt에서 모든 이벤트를 제거합니다 (커스텀 이벤트와 내장 이벤트 모두 포함)

### Example

~~~jsx
gantt.attachEvent("onTaskClick", function(id, e) {
    alert("id="+id+"인 항목을 클릭했습니다.");
});
gantt.attachEvent("onTaskDblClick", function(id, e) {
    alert("id="+id+"인 항목을 더블 클릭했습니다.");
});

gantt.detachAllEvents();
~~~

### Details

**detachAllEvents** 메서드는 dhtmlxGantt의 모든 이벤트 핸들러를 한 번에 제거하기 때문에, 커스텀 코드로 추가한 이벤트뿐만 아니라 dhtmlxGantt 내부 기능 연결에 사용되는 이벤트도 함께 삭제되어 기능에 문제가 생길 수 있습니다.

더 나은 방법은 [attachEvent](api/method/attachevent.md) 메서드가 반환하는 ID를 저장해두고, 필요할 때 [detachEvent](api/method/detachevent.md)를 사용해 특정 이벤트만 제거하는 것입니다. 위 예제에서와 같이 사용할 수 있습니다.

<br>
:::note
 **detachAllEvents** 메서드는 더 이상 권장되지 않습니다. 대신 다음과 같이 사용하세요: 
:::

~~~
// 이벤트를 attach할 때 핸들러 ID 저장
var events = [];
events.push(gantt.attachEvent("onTaskClick", function(id, e) {
    alert("id="+id+"인 항목을 클릭했습니다.");
});
events.push(gantt.attachEvent("onTaskDblClick", function(id, e) {
    alert("id="+id+"인 항목을 더블 클릭했습니다.");
});

// 저장된 모든 이벤트 detach
while (events.length)
   gantt.detachEvent(events.pop()); /*!*/
~~~

### Related API
- [detachEvent](api/method/detachevent.md)
- [attachEvent](api/method/attachevent.md)

### Related Guides
- [이벤트 처리](guides/handling-events.md)

