---
sidebar_label: onBeforeTaskMove
title: onBeforeTaskMove event
description: "작업이 수직 위치를 변경하기 직전에 트리거됩니다."
---

# onBeforeTaskMove

### Description

@short: 작업이 수직 위치를 변경하기 직전에 트리거됩니다.

@signature: onBeforeTaskMove: (id: string | number, parent: string | number, tindex: number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 이동 중인 작업의 ID
- `parent` - (required) *string | number* - 새 부모의 ID
- `tindex` - (required) *number* - 부모 브랜치 내의 새 위치 인덱스

### Returns
- ` result` - (boolean) - 기본 이벤트 동작을 계속할지(<b>true</b>) 중단할지(<b>false</b>)를 나타냅니다.

### Example

~~~jsx
//다른 하위 브랜치로 이동 차단:
gantt.attachEvent("onBeforeTaskMove", function(id, parent, tindex){
    const task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});
~~~

### Details

이 이벤트는 차단할 수 있습니다. *false*를 반환하면 작업 이동이 방지됩니다.

이 이벤트는 다음 두 가지 상황에서 발생한다는 점을 유의하세요:

1. [moveTask](api/method/movetask.md) 메서드가 호출될 때
2. 옵션 [order_branch](api/config/order_branch.md)가 기본 설정(*gantt.config.order_branch = true;*)으로 활성화되어 있고, 사용자가 작업을 드래그할 때

### Related API
- [moveTask](api/method/movetask.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)

