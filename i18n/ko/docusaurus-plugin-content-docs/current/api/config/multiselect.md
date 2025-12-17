---
sidebar_label: multiselect
title: multiselect config
description: "Gantt 차트에서 여러 작업을 동시에 선택할 수 있는지 여부를 제어합니다."
---

# multiselect

### Description

@short: Gantt 차트에서 여러 작업을 동시에 선택할 수 있는지 여부를 제어합니다.

@signature: multiselect: boolean

### Example

~~~jsx
gantt.config.multiselect = false; // 다중 작업 선택 기능을 끕니다.
gantt.init('gantt_here');
~~~

**Default value:** true

### Details

:::note
note 이 설정은 **multiselect** 확장 기능의 일부이므로, [multiselect](guides/extensions-list.md#multitaskselection) 플러그인을 활성화해야 합니다. 자세한 내용은 [멀티 태스크 선택](guides/multiselection.md) 문서를 참고하세요. 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- [멀티 태스크 선택](guides/multiselection.md)

