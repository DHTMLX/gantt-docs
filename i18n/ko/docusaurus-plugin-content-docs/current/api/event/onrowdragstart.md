---
sidebar_label: onRowDragStart
title: onRowDragStart event
description: "그리드의 행을 수직으로 재배열하기 위해 사용자가 행을 드래그하기 전에 발생합니다"
--- 

# onRowDragStart

### Description

@short: 사용자가 그리드의 행을 수직으로 재정렬하기 위해 드래그하기 전에 발생합니다

@signature: onRowDragStart: (id: string | number, target: HTMLElement, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 그리드에서 사용자가 드래그하는 작업의 ID
- `target` - (required) *HTMLElement* - 사용자가 드래그하는 작업의 HTML 요소
- `e` - (required) *Event* - 네이티브 이벤트 객체

### Returns
- ` result` - (boolean) - 기본 동작이 트리거되는지 여부를 정의합니다 (<b>true</b>) 또는 취소됩니다 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onRowDragStart", function(id, target, e) {
    // 여기에 코드 작성
    return true;
});
~~~

### Related samples
- [Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

:::note
이벤트는 왼쪽 그리드에서 마우스 포인터로 태스크를 이동할 때, order_branch 설정이 활성화된 경우에 트리거됩니다. 가지 순서 재정렬이 비활성화되어 있으면 이 이벤트는 호출되지 않습니다.
:::


이 이벤트는 *false*를 반환하여 차단할 수 있으며, 이 경우 드래그가 시작되지 않습니다.

### Related API
- [onRowDragEnd](api/event/onrowdragend.md)
- [order_branch](api/config/order_branch.md)

### Related Guides
- [Reordering Tasks](guides/reordering-tasks.md)