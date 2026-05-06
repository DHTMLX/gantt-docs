---
sidebar_label: multiselect
title: multiselect config
description: "Gantt 차트에서 여러 작업을 동시에 선택할 수 있는지 여부를 제어합니다."
---

# multiselect

### Description

@short: 간트 차트에서 다중 작업 선택을 활성화/비활성화합니다

@signature: multiselect: boolean

### Example

~~~jsx
gantt.config.multiselect = false; //disables multi-task selection
gantt.init('gantt_here');
~~~

**기본값:** true

### Details

:::note
이 옵션은 **multiselect** 확장으로 정의되어 있으므로 [multiselect](guides/extensions-list.md#multitaskselection) 플러그인을 활성화해야 합니다. 자세한 내용은 [Multi-Task Selection](guides/multiselection.md) 문서를 참조하세요. 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect_one_level](api/config/multiselect_one_level.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md)