---
sidebar_label: onAfterTaskMove
title: onAfterTaskMove event
description: "작업이 새로운 세로 위치로 이동된 직후에 트리거됩니다."
---

# onAfterTaskMove

### Description

@short: 작업이 새로운 세로 위치로 이동된 직후에 트리거됩니다.

@signature: onAfterTaskMove: (id: string | number, parent: string | number, tindex: number) =\> void;

### Parameters

- `id` - (required) *string | number* - 이동된 작업의 ID
- `parent` - (required) *string | number* - 새로운 부모의 ID
- `tindex` - (required) *number* - 부모 브랜치 내에서의 새로운 위치 인덱스

### Example

~~~jsx
// 다른 하위 브랜치로 이동하는 것을 방지
gantt.attachEvent("onAfterTaskMove", function(id, parent, tindex){
    // 여기에 커스텀 로직 작성
});
~~~

### Details

이 이벤트는 두 가지 상황에서 발생한다는 점을 유의하세요:

1. [moveTask](api/method/movetask.md) 메서드가 호출될 때
2. 옵션 [order_branch](api/config/order_branch.md)가 기본 설정(*gantt.config.order_branch = true;*)으로 활성화되어 있고 사용자가 작업을 드래그할 때

### Related API
- [moveTask](api/method/movetask.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)

