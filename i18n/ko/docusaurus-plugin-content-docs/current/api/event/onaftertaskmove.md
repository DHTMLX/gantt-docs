---
sidebar_label: onAfterTaskMove
title: onAfterTaskMove 이벤트
description: "작업이 새로운 수직 위치로 이동된 후에 발생합니다"
---

# onAfterTaskMove

### Description

@short: 작업이 새로운 수직 위치로 이동된 후에 발생합니다

@signature: onAfterTaskMove: (id: string | number, parent: string | number, tindex: number) =\> void;

### Parameters

- `id` - (required) *string | number* - 이동할 작업의 ID
- `parent` - (required) *string | number* - 부모 ID
- `tindex` - (required) *number* - 작업이 이동될 부모 가지에서의 위치 인덱스

### Example

~~~jsx
// 다른 하위 가지로의 이동 방지
gantt.attachEvent("onAfterTaskMove", function(id, parent, tindex){
    // 여기에 사용자 정의 로직
});
~~~

### Details

참고: 이 이벤트는 두 가지 경우에 발생합니다:

1. 메서드 [moveTask](api/method/movetask.md)를 호출하는 동안
2. 기본 모드에서 옵션 [order_branch](api/config/order_branch.md)가 활성화되어 있고(예: *gantt.config.order_branch = true;*) 사용자가 작업을 드래그할 때

### Related API
- [moveTask](api/method/movetask.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)