---
sidebar_label: onRowDragEnd
title: onRowDragEnd event
description: "사용자가 그리드 내에서 세로로 재정렬된 행을 드롭한 후 발생합니다."
---

# onRowDragEnd

### Description

@short: 사용자가 그리드 내에서 세로로 재정렬된 행을 드롭한 후 발생합니다.

@signature: onRowDragEnd: (id: string | number, target: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - 그리드 내에서 세로로 드래그된 작업의 ID
- `target` - (required) *string | number* - 드래그된 행이 위치를 차지한 작업의 ID

### Example

~~~jsx
gantt.attachEvent("onRowDragEnd", function(id, target) {
    //여기에 커스텀 로직을 추가할 수 있습니다.
});
~~~

### Related samples
- [Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

:::note

이 이벤트는 [order_branch](api/config/order_branch.md) 설정이 활성화된 경우, 왼쪽 그리드 내에서 마우스를 사용해 작업이 이동될 때 발생합니다. 브랜치 재정렬이 비활성화된 경우, 이 이벤트는 호출되지 않습니다.
 
:::

**target** 매개변수는 이동된 작업 바로 앞 또는 바로 뒤에 위치한 가장 가까운 작업의 ID를 담고 있습니다.

이 값에는 두 가지 형식이 있습니다:

- *target=targetId* - 이동된 작업이 targetId 작업 바로 **앞에** 배치되어야 함
- *target=next:targetId* - 이동된 작업이 targetId 작업 바로 **뒤에** 배치되어야 함 (차트의 마지막 작업이 교체된 경우 발생)

*next:targetId* 형식으로 전달된 target ID를 추출하는 예시는 다음과 같습니다:

~~~js
gantt.attachEvent("onRowDragEnd", function(id, target) {
      if(typeof(target) === "string"){
        targetTaskId  = target.substr("next:".length);
        nextTask = true;
      } else {
        targetTaskId  = target;
        nextTask = false;
      }
});
~~~

### Related API
- [onBeforeRowDragEnd](api/event/onbeforerowdragend.md)
- [onRowDragStart](api/event/onrowdragstart.md)
- [order_branch](api/config/order_branch.md)

### Related Guides
- [작업 순서 변경하기](guides/reordering-tasks.md)

