---
sidebar_label: isReadonly
title: isReadonly 메서드
description: "지정된 작업/링크 또는 전체 Gantt가 읽기 전용인지 확인합니다"
---

# isReadonly

### Description

@short: 지정된 작업/링크 또는 전체 Gantt가 읽기 전용인지 확인합니다

@signature: isReadonly: (item?: number | string | Task | Link) =\> boolean

### Parameters

- `item` - (optional) *number | string | Task | Link* - 선택적, 작업/링크의 ID 또는 객체. 미지정시, 메서드는 Gantt가 읽기 전용인지 확인합니다

### Returns
- ` mode` - (boolean) - <i>true</i>, 만약 작업/링크 또는 Gantt가 읽기 전용이면. 그렇지 않으면 <i>false</i>

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2023",
    duration:28
}, "project_2");

gantt.isReadonly(10); // ->거짓

// 또는
gantt.isReadonly(gantt.getTask(10)); // ->거짓
~~~

### Related Guides
- [Read-Only Mode](guides/readonly-mode.md#readonlymodeforspecifictaskslinks)