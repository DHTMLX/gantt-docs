---
sidebar_label: getLastSelectedTask
title: getLastSelectedTask 메서드
description: "마지막으로 선택된 작업의 id를 반환합니다"
---

# getLastSelectedTask

### Description

@short: 마지막으로 선택된 작업의 id를 반환합니다

@signature: getLastSelectedTask: () =\> string | number

### Returns
- ` id` - (string | number) - 마지막으로 선택된 작업의 id

### Example

~~~jsx
gantt.getLastSelectedTask();
~~~

### Details

:::note
이 메서드는 **multiselect** 확장에 정의되어 있으므로 [multiselect](guides/extensions-list.md#multitaskselection) 플러그인을 활성화해야 합니다. 자세한 내용은 [Multi-Task Selection](guides/multiselection.md) 기사에서 확인하십시오.
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

