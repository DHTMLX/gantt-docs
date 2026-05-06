---
sidebar_label: order_branch_free
title: order_branch_free 설정
description: "전체 간트 차트에서 작업을 재정렬할 수 있도록 하는 'branch' 모드 활성화"
---

# order_branch_free

### Description

@short: 전체 간트 차트에서 작업을 재정렬할 수 있도록 하는 'branch' 모드 활성화

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
- [Reordering Tasks](guides/reordering-tasks.md)