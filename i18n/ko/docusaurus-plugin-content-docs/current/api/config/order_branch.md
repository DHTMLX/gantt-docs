---
sidebar_label: order_branch
title: order_branch config
description: "동일한 트리 레벨 내에서 작업을 세로로 재배열하는 'branch' 모드를 활성화합니다."
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
- [Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

### Details

이 설정은 작업을 현재 트리 레벨에 유지하면서 순서를 변경할 수 있게 해줍니다. 예를 들어, 하위 작업은 하위 작업으로 남아있으며 상위 작업이 되지 않습니다.

## 성능 향상

작업 수가 많을 경우, 기본 branch 재정렬은 속도를 저하시킬 수 있습니다.
성능을 개선하려면 **"marker"** 모드로 전환할 수 있습니다.

~~~js
gantt.config.order_branch = "marker";
~~~

:::note
sample [Branch ordering - highlighting mode](https://docs.dhtmlx.com/gantt/samples/07_grid/14_branch_ordering_highlight.html) 
:::

이 모드에서는 작업 이름만 왼쪽 마우스 버튼을 누른 상태로 이동하며, 작업을 새로운 위치에 놓을 때(버튼을 놓을 때)만 간트 차트가 새로 고침됩니다.
기본 모드와 달리, 이 방식으로 작업을 이동해도 onBeforeTaskMove 또는 onAfterTaskMove 이벤트가 발생하지 않습니다.

특정 위치에 작업 드롭을 차단하려면 [onBeforeRowDragMove](api/event/onbeforerowdragmove.md) 이벤트를 사용하세요(이 이벤트는 "marker" 모드에서만 작동합니다).

### Related API
- [order_branch_free](api/config/order_branch_free.md)
- [onAfterTaskMove](api/event/onaftertaskmove.md)
- [onBeforeTaskMove](api/event/onbeforetaskmove.md)
- [onBeforeRowDragMove](api/event/onbeforerowdragmove.md)

### Related Guides
- [작업 순서 변경하기](guides/reordering-tasks.md)

