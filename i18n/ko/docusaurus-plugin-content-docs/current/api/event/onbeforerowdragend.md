---
sidebar_label: onBeforeRowDragEnd
title: onBeforeRowDragEnd event
description: "그리드에서 사용자가 행을 드롭할 때 발생합니다"
---

# onBeforeRowDragEnd

### Description

@short: 사용자가 그리드에 행을 드롭할 때 발생합니다

@signature: onBeforeRowDragEnd: (sid: string | number, parent: string | number, tindex: number) => boolean;

### Parameters

- `sid` - (required) *string | number* - 이동할 작업의 ID
- `parent` - (required) *string | number* - 상위 ID. 아래의 세부 정보를 확인
- `tindex` - (required) *number* - 작업이 이동될 위치의 인덱스 <br/> (전체 트리에서의 인덱스). 지정되면, <b>tindex</b>는 'parent' 가지의 인덱스를 가리킵니다. 아래의 세부 정보를 확인하십시오

### Returns
- ` result` - (boolean) - 기본 이벤트 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소될지 여부를 정의합니다 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onBeforeRowDragEnd", function(id, parent, tindex){
    const task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});
~~~

### Related samples
- [Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

:::note
이벤트는 좌측의 그리드에서 마우스 포인터로 태스크를 이동시킬 때, [order_branch](api/config/order_branch.md) 설정이 활성화되어 있을 때 발생합니다. 가지 재정렬이 비활성화되어 있으면 이 이벤트는 호출되지 않습니다.
:::

- 이벤트가 발행되면 태스크는 이미 새로운 위치로 이동되었지만, 변경사항은 여전히 되돌릴 수 있습니다
- 이벤트는 차단 가능합니다. *false*를 반환하고 태스크를 원래 위치로 이동합니다
- 원래 위치(부모 및 인덱스)는 핸들러 인수로부터 사용할 수 있습니다
- 대상 위치는 태스크 객체에서 [task.parent](guides/task-tree-operations.md#parent-of-a-task) 및 [gantt.getGlobalTaskIndex(taskId)](api/method/getglobaltaskindex.md)로부터 얻을 수 있습니다
- **parent** 와 **tindex** 매개변수는 설정된 [order_branch](api/config/order_branch.md) 모드에 따라 달라집니다: 
    - 일반 모드("true")에서는
        - **parent** 매개변수는 원래 태스크의 부모를 가리킵니다 (이전 위치의 부모)
        - **tindex** 매개변수는 원래 로컬 인덱스를 가리킵니다
    - "marker" 모드에서는
        - **parent** 매개변수는 새 태스크의 부모를 가리키고
        - **tindex** 매개변수는 새 로컬 인덱스를 가리킵니다

### Related API
- [onRowDragEnd](api/event/onrowdragend.md)
- [onRowDragStart](api/event/onrowdragstart.md)
- [order_branch](api/config/order_branch.md)

### Related Guides
- [작업 순서 변경하기](guides/reordering-tasks.md)

