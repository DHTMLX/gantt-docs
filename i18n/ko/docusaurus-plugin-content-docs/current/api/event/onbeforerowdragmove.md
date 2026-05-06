---
sidebar_label: onBeforeRowDragMove
title: onBeforeRowDragMove event
description: "그리드의 행이 수직으로 다른 위치로 드래그되기 전에 발생합니다"
---

# onBeforeRowDragMove

### Description

@short: 그리드의 행이 수직으로 다른 위치로 드래그되기 전에 발생합니다

@signature: onBeforeRowDragMove: (id: string | number, parent: string | number, tindex: number) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 그리드에서 이동할 작업의 ID
- `parent` - (required) *string | number* - 상위 ID
- `tindex` - (required) *number* - 작업이 이동될 상위 분기의 위치 인덱스

### Returns
- `result` - (boolean) - 이 이벤트의 기본 동작이 실행될지 여부를 정의합니다 (<b>true</b>) 또는 취소될지 여부를 정의합니다 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeRowDragMove", function(id, parent, tindex){
    // true 또는 false를 반환;
});
~~~

### Details

이벤트는 차단될 수 있습니다. 행의 이동을 취소하려면 *false*를 반환하십시오.

:::note
옵션 [order_branch](api/config/order_branch.md)가 "marker" 값으로 설정된 경우에만 이벤트가 발생합니다.
:::

### Related API
- [order_branch](api/config/order_branch.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)