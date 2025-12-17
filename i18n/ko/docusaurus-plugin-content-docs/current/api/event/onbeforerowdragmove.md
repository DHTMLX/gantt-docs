---
sidebar_label: onBeforeRowDragMove
title: onBeforeRowDragMove event
description: "그리드 내에서 행이 수직으로 새 위치로 드래그되기 직전에 트리거됩니다."
---

# onBeforeRowDragMove

### Description

@short: 그리드 내에서 행이 수직으로 새 위치로 드래그되기 직전에 트리거됩니다.

@signature: onBeforeRowDragMove: (id: string | number, parent: string | number, tindex: number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 그리드 내에서 이동 중인 작업의 ID
- `parent` - (required) *string | number* - 새 부모의 ID
- `tindex` - (required) *number* - 작업이 배치될 부모 브랜치 내의 대상 인덱스

### Returns
- ` result` - (boolean) - 기본 이벤트 동작을 계속할지(<b>true</b>) 중지할지(<b>false</b>)를 나타냅니다.

### Example

~~~jsx
gantt.attachEvent("onBeforeRowDragMove", function(id, parent, tindex){
    // true 또는 false를 반환;
});
~~~

### Details

이 이벤트는 차단할 수 있습니다. *false*를 반환하면 행이 이동되는 것을 방지합니다.

:::note
 이 이벤트는 옵션 [order_branch](api/config/order_branch.md)가 "marker"로 설정된 경우에만 발생합니다. 
:::

### Related API
- [order_branch](api/config/order_branch.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)

