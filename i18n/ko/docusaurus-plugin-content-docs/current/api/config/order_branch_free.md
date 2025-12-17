---
sidebar_label: order_branch_free
title: order_branch_free config
description: "'gantt 차트 전체에서 작업을 자유롭게 재배치할 수 있는 'branch' 모드를 활성화합니다."
---

# order_branch_free

### Description

@short: 'gantt 차트 전체에서 작업을 자유롭게 재배치할 수 있는 'branch' 모드를 활성화합니다.

@signature: order_branch_free: boolean

### Example

~~~jsx
// 동일한 중첩 레벨 내에서 작업 재배치
gantt.config.order_branch = true;
// gantt 전체 어디서나 작업 재배치
gantt.config.order_branch_free = true;
 
gantt.init("gantt_here");
~~~

**Default value:** false

### Related samples
- [Drag and drop rows in Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/08_drag_between_levels.html)

### Related API
- [order_branch](api/config/order_branch.md)

### Related Guides
- [작업 순서 변경하기](guides/reordering-tasks.md)

