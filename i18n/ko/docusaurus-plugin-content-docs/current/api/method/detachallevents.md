---
sidebar_label: detachAllEvents
title: detachAllEvents method
description: "dhtmlxGantt에서 모든 이벤트를 분리합니다(사용자 정의 및 내부 이벤트 모두)"
--- 

# detachAllEvents

### Description

@short: dhtmlxGantt에서 모든 이벤트를 분리합니다(사용자 정의 이벤트 및 내부 이벤트 모두)

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

참고로 **detachAllEvents** 메서드를 사용하면 dhtmlxGantt의 기능이 중단될 수 있습니다. 이 메서드는 한 번에 모든 이벤트 핸들러를 제거합니다: 사용자 정의 로직에 의해 정의된 것과 dhtmlxGantt 자체에 의해 정의된 것(다른 부분과 기능을 연결하기 위해).

더 안전한 방법은 [attachEvent](api/method/attachevent.md) 메서드의 결과를 저장하고 필요할 때 [detachEvent](api/method/detachevent.md) 메서드를 사용하여 저장된 이벤트를 해제하는 것입니다. 위 예제에 보인 바와 같습니다.

:::note
The **detachAllEvents** 메서드는 더 이상 권장되지 않습니다. 대신 아래를 사용할 수 있습니다:
:::

~~~js
// 이벤트를 연결할 때 핸들러 ID를 저장
var events = [];
events.push(gantt.attachEvent("onTaskClick", function(id, e) {
    alert("id="+id+"인 항목을 클릭했습니다.");
});
events.push(gantt.attachEvent("onTaskDblClick", function(id, e) {
    alert("id="+id+"인 항목을 더블 클릭했습니다.");
});

// 저장된 모든 이벤트를 해제합니다
while (events.length)
   gantt.detachEvent(events.pop()); /*!*/
~~~

### Related API
- [detachEvent](api/method/detachevent.md)
- [attachEvent](api/method/attachevent.md)

### Related Guides
- [이벤트 처리](guides/handling-events.md)

