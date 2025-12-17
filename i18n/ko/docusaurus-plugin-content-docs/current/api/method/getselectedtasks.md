---
sidebar_label: getSelectedTasks
title: getSelectedTasks method
description: "현재 선택된 작업들의 배열을 반환합니다."
---

# getSelectedTasks

### Description

@short: 현재 선택된 작업들의 배열을 반환합니다.

@signature: getSelectedTasks: () =\> any[]

### Returns
- ` tasks` - (array) - 작업 ID들의 배열을 반환합니다.

### Example

~~~jsx
gantt.getSelectedTasks();
~~~

### Details

:::note
 이 메서드는 **multiselect** 확장 기능에서 제공되므로, [multiselect](guides/extensions-list.md#multitaskselection) 플러그인이 활성화되어 있는지 확인하세요. 자세한 내용은 [멀티 태스크 선택](guides/multiselection.md) 문서를 참고하세요. 
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

