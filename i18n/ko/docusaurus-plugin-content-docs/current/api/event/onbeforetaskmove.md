---
sidebar_label: onBeforeTaskMove
title: onBeforeTaskMove 이벤트
description: "작업이 새로운 세로 위치로 이동하기 전에 발생합니다"
---

# onBeforeTaskMove

### Description

@short: 작업이 새로운 세로 위치로 이동하기 전에 발생합니다

@signature: onBeforeTaskMove: (id: string | number, parent: string | number, tindex: number) =\> boolean;

### Parameters

- `id` - (필수) *string | number* - 이동할 작업의 ID
- `parent` - (필수) *string | number* - 부모 ID
- `tindex` - (필수) *number* - 작업이 이동될 부모 가지에서의 위치 인덱스

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소될지 (<b>false</b>)

### Example

~~~jsx
//다른 하위 브랜치로의 이동을 방지합니다:
gantt.attachEvent("onBeforeTaskMove", function(id, parent, tindex){
    const task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});
~~~

### Details

이벤트는 차단할 수 있습니다. 작업 이동을 취소하려면 *false*를 반환합니다.

참고: 이 이벤트는 두 가지 경우에 발생합니다:

1. 메서드 [moveTask](api/method/movetask.md)를 호출하는 동안
2. 기본 모드에서 옵션 [order_branch](api/config/order_branch.md)가 활성화되어 있고 사용자가 작업을 드래그할 때

### Related API
- [moveTask](api/method/movetask.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)