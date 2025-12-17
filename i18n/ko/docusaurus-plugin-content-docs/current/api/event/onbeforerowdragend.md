---
sidebar_label: onBeforeRowDragEnd
title: onBeforeRowDragEnd event
description: "사용자가 그리드 내에서 행을 드롭할 때 발생합니다."
---

# onBeforeRowDragEnd

### Description

@short: 사용자가 그리드 내에서 행을 드롭할 때 발생합니다.

@signature: onBeforeRowDragEnd: (sid: string | number, parent: string | number, tindex: number) =\> boolean;

### Parameters

- `sid` - (required) *string | number* - 이동 중인 작업의 ID  
- `parent` - (required) *string | number* - 부모 ID입니다. 자세한 내용은 아래를 참조하세요  
- `tindex` - (required) *number* - 작업이 이동된 위치의 인덱스 <br> (전체 트리 내 인덱스). 지정된 경우 <b>tindex</b>는 'parent' 브랜치 내 인덱스에 해당합니다. 자세한 내용은 아래 참조

### Returns
- ` result` - (boolean) - 기본 이벤트 동작이 진행될지(<b>true</b>) 취소될지(<b>false</b>) 결정합니다.

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
  
이 이벤트는 [order_branch](api/config/order_branch.md) 설정이 활성화된 상태에서 왼쪽 그리드에서 마우스를 사용해 작업을 이동할 때 발생합니다. 브랜치 재정렬이 비활성화된 경우 이 이벤트는 발생하지 않습니다. 
 
::: 

- 이 이벤트가 발생할 때 작업은 이미 새 위치로 이동된 상태이나 변경 사항은 아직 취소할 수 있습니다.  
- 이벤트를 차단할 수 있습니다. *false*를 반환하면 작업 이동이 취소되고 원래 위치로 돌아갑니다.  
- 원래 위치(부모 및 인덱스)는 핸들러에 인자로 전달됩니다.  
- 대상 위치는 작업 객체의 [task.parent](guides/task-tree-operations.md#parentofatask) 및 [gantt.getGlobalTaskIndex(taskId)](api/method/getglobaltaskindex.md)에서 확인할 수 있습니다.  
- **parent** 및 **tindex** 매개변수는 [order_branch](api/config/order_branch.md) 모드에 따라 다릅니다:  
    - 표준 모드("true")에서는:  
        - **parent**는 작업이 이동되기 전의 *원래* 부모를 가리킵니다.  
        - **tindex**는 *원래* 로컬 인덱스를 가리킵니다.  
    - "marker" 모드에서는:  
        - **parent**는 작업의 새 부모를 가리킵니다.  
        - **tindex**는 새 로컬 인덱스를 가리킵니다.

### Related API
- [onRowDragEnd](api/event/onrowdragend.md)
- [onRowDragStart](api/event/onrowdragstart.md)
- [order_branch](api/config/order_branch.md)

### Related Guides
- [작업 순서 변경하기](guides/reordering-tasks.md)

