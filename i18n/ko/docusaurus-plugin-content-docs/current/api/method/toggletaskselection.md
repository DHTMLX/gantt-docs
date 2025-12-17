---
sidebar_label: toggleTaskSelection
title: toggleTaskSelection method
description: "지정된 작업의 선택 상태를 전환합니다 - 선택되지 않은 경우 선택하고, 이미 선택된 경우 선택 해제합니다."
---

# toggleTaskSelection

### Description

@short: 지정된 작업의 선택 상태를 전환합니다 - 선택되지 않은 경우 선택하고, 이미 선택된 경우 선택 해제합니다.

@signature: toggleTaskSelection: (taskId: string | number) =\> void

### Parameters

- `taskId` - (required) *string | number* -        작업의 ID

### Example

~~~jsx
gantt.toggleTaskSelection("t_1"); 
gantt.render();
~~~

### Details

:::note
 이 메서드는 **multiselect** 확장의 일부이므로, 먼저 [multiselect](guides/extensions-list.md#multitaskselection) 플러그인을 활성화해야 합니다. 자세한 내용은 [멀티 태스크 선택](guides/multiselection.md) 문서를 참고하세요. 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)

### Related Guides
- [멀티 태스크 선택](guides/multiselection.md)

