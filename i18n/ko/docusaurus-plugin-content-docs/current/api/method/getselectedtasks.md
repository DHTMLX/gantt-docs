---
sidebar_label: getSelectedTasks
title: getSelectedTasks 메서드
description: "현재 선택된 작업들의 배열을 반환합니다"
---

# getSelectedTasks

### Description

@short: 현재 선택된 작업들의 배열을 반환합니다

@signature: getSelectedTasks: () =\> any[]

### Returns
- ` tasks` - (array) - 선택된 작업들의 ID 배열

### Example

~~~jsx
gantt.getSelectedTasks();
~~~

### Details

:::note
이 메서드는 **multiselect** 확장에서 정의되어 있으므로, [multiselect](guides/extensions-list.md#multitaskselection) 플러그인을 활성화해야 합니다. 자세한 내용은 [Multi-Task Selection](guides/multiselection.md) 문서를 참조하십시오.
:::

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- [멀티 태스크 선택](guides/multiselection.md)

