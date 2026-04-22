---
sidebar_label: order_branch
title: order_branch config
description: "브랜치 모드를 활성화하여 동일 트리 레벨 내에서 작업을 수직으로 재배열할 수 있습니다"
--- 

# order_branch

### Description

@short: 동일한 트리 레벨 내에서 작업을 세로로 재배열하는 'branch' 모드를 활성화합니다.

@signature: order_branch: string | boolean

### Example

~~~jsx
gantt.config.order_branch = true;

gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [브랜치 정렬](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

이 옵션은 트리 레벨 위치를 저장하면서 작업을 재정렬할 수 있게 해줍니다. 예를 들어, 서브태스크는 절대로 상위 태스크가 되지 않습니다.

## 성능 향상

태스크가 많은 Gantt의 경우, 기본 브랜치 재정렬 모드는 성능을 느리게 만들 수 있습니다.
속도를 높이려면 **"marker"** 모드를 사용할 수 있습니다. 

~~~js
gantt.config.order_branch = "marker";
~~~

:::note
샘플 [Branch ordering - highlighting mode](https://docs.dhtmlx.com/gantt/samples/07_grid/14_branch_ordering_highlight.html) 
:::

이 모드에서는 태스크의 이름만 재정렬되며(왼쪽 마우스 버튼을 누르고 있을 때) 태스크가 대상 위치에 드롭될 때에만 Gantt가 다시 렌더링됩니다(키를 놓을 때).
기본 모드와 달리 태스크 위치 변경 시 onBeforeTaskMove/onAfterTaskMove 이벤트가 발생하지 않습니다.

특정 위치에서 태스크를 드롭하지 못하게 하려면 대신 [onBeforeRowDragMove](api/event/onbeforerowdragmove.md) 이벤트를 사용하세요(이 모드는 오직 "marker" 모드에서만 작동합니다).

### Related API
- [order_branch_free](api/config/order_branch_free.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)
- [onBeforeRowDragMove](api/event/onbeforerowdragmove.md)

### Related Guides
- [태스크 재정렬](guides/reordering-tasks.md)