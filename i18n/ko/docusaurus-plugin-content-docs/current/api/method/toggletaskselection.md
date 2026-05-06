---
sidebar_label: toggleTaskSelection
title: toggleTaskSelection 메서드
description: "지정된 작업이 선택되지 않았다면 선택하고, 그렇지 않으면 해제합니다"
---

# toggleTaskSelection

### Description

@short: 지정된 작업이 선택되지 않았다면 선택하고, 그렇지 않으면 해제합니다

@signature: toggleTaskSelection: (taskId: string | number) =\> void

### Parameters

- `taskId` - (필수) *string | number* -  태스크의 ID

### Example

~~~jsx
gantt.toggleTaskSelection("t_1"); 
gantt.render();
~~~

### Details

:::note
이 메서드는 **multiselect** 확장에 정의되어 있으므로 [multiselect](guides/extensions-list.md#multitaskselection) 플러그인을 활성화해야 합니다. 자세한 내용은 [Multi-Task Selection](guides/multiselection.md) 문서를 참조하십시오. 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)

### Related Guides
- [멀티태스크 선택](guides/multiselection.md)