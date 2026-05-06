---
sidebar_label: onRowDragEnd
title: onRowDragEnd event
description: "그리드에서 사용자가 수직으로 재정렬된 행을 드래그해 놓은 직후에 발생합니다"
---

# onRowDragEnd

### Description

@short: 그리드에서 사용자가 수직으로 재정렬된 행을 드래그해 놓은 직후에 발생합니다

@signature: onRowDragEnd: (id: string | number, target: string | number) =\> void;

### Parameters

- `id` - (required) *string | number* - 그리드에서 사용자가 수직으로 드래그한 작업의 ID
- `target` - (required) *string | number* - 드래그한 행이 차지한 대상 작업의 ID

### Example

~~~jsx
gantt.attachEvent("onRowDragEnd", function(id, target) {
    // 여기에 코드 작성
});
~~~

### Related samples
- [Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

:::note
왼쪽 그리드에서 마우스 포인터로 작업이 이동하는 동안 [order_branch](api/config/order_branch.md) 설정이 활성화되어 있으면 이벤트가 발생합니다. 브랜치 재정렬이 비활성화된 경우 이벤트는 호출되지 않습니다.
:::

The **target** 매개변수에는 현재 작업 바로 앞이나 바로 뒤에 위치하는 가장 가까운 작업의 ID가 포함됩니다.

값은 두 가지 형식 중 하나로 올 수 있습니다:

- *target=targetId* - 현재 작업은 targetId 작업의 바로 앞에 오도록 해야 합니다
- *target=next:targetId* - 현재 작업은 targetId 작업의 바로 뒤에 오도록 해야 합니다(차트의 마지막 작업을 대체하는 경우에 해당)

다음 형식(next:targetId)으로 대상의 ID를 얻는 예시:

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
- [Reordering Tasks](guides/reordering-tasks.md)