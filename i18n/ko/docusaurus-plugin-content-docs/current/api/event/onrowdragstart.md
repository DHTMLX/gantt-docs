---
sidebar_label: onRowDragStart
title: onRowDragStart event
description: "그리드에서 행이 수직 재정렬을 위해 드래그되기 직전에 발생하는 이벤트"
---

# onRowDragStart

### Description

@short: 그리드에서 행이 수직 재정렬을 위해 드래그되기 직전에 발생하는 이벤트

@signature: onRowDragStart: (id: string | number, target: HTMLElement, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string | number* - 그리드 내에서 드래그되는 작업의 ID
- `target` - (required) *HTMLElement* - 드래그되는 작업을 나타내는 HTML 요소
- `e` - (required) *Event* - 드래그 동작과 관련된 네이티브 이벤트 객체

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 진행될지(<b>true</b>) 중단될지(<b>false</b>) 결정

### Example

~~~jsx
gantt.attachEvent("onRowDragStart", function(id, target, e) {
    //여기에 사용자 정의 로직을 추가할 수 있습니다
    return true;
});
~~~

### Related samples
- [Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

:::note

이 이벤트는 마우스를 사용하여 왼쪽 그리드 영역 내에서 작업을 드래그할 때 발생하며, [order_branch](api/config/order_branch.md) 옵션이 활성화된 경우에만 적용됩니다. 브랜치 재정렬이 비활성화된 경우 이 이벤트는 발생하지 않습니다.
 
:::


이 이벤트는 *false*를 반환하여 차단할 수 있으며, 이 경우 드래그가 시작되지 않습니다.

### Related API
- [onRowDragEnd](api/event/onrowdragend.md)
- [order_branch](api/config/order_branch.md)

### Related Guides
- [작업 순서 변경하기](guides/reordering-tasks.md)

