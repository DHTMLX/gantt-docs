---
sidebar_label: isReadonly
title: isReadonly method
description: "주어진 작업, 링크 또는 전체 Gantt 차트가 읽기 전용으로 설정되어 있는지 여부를 결정합니다."
---

# isReadonly

### Description

@short: 주어진 작업, 링크 또는 전체 Gantt 차트가 읽기 전용으로 설정되어 있는지 여부를 결정합니다.

@signature: isReadonly: (item?: number | string | Task | Link) =\> boolean

### Parameters

- `item` - (optional) *number | string | Task | Link* -    선택 사항, 작업 또는 링크를 나타내는 ID 또는 객체입니다. 생략하면 전체 Gantt가 읽기 전용인지 확인합니다.

### Returns
- ` mode` - (boolean) - <i>true</i> 지정된 작업/링크 또는 전체 Gantt가 읽기 전용인 경우; 그렇지 않으면 <i>false</i>

### Example

~~~jsx
gantt.addTask({
    id:10,
    text:"Task #5",
    start_date:"02-09-2023",
    duration:28
}, "project_2");

gantt.isReadonly(10); // ->false

// 또는
gantt.isReadonly(gantt.getTask(10)); // -> false
~~~

### Related Guides
- [읽기 전용 모드](guides/readonly-mode.md#readonlymodeforspecifictaskslinks)
