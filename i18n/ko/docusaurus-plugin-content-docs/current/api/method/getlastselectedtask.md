---
sidebar_label: getLastSelectedTask
title: getLastSelectedTask method
description: "가장 최근에 선택된 작업의 ID를 제공합니다"
---

# getLastSelectedTask

### Description

@short: 가장 최근에 선택된 작업의 ID를 제공합니다

@signature: getLastSelectedTask: () =\> string | number

### Returns
- ` id` - (string | number) - 가장 최근에 선택된 작업의 ID

### Example

~~~jsx
gantt.getLastSelectedTask();
~~~

### Details

:::note
 이 메서드는 **multiselect** 확장의 일부이므로, [multiselect](guides/extensions-list.md#multitaskselection) 플러그인을 활성화해야 합니다. 자세한 내용은 [멀티 태스크 선택](guides/multiselection.md) 문서를 참조하세요. 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- [멀티 태스크 선택](guides/multiselection.md)

