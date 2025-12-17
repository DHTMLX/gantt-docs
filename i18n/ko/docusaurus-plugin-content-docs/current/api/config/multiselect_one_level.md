---
sidebar_label: multiselect_one_level
title: multiselect_one_level config
description: "멀티 태스크 선택이 단일 레벨로 제한되는지, 아니면 여러 레벨에 걸쳐 가능한지 제어합니다."
---

# multiselect_one_level

### Description

@short: 멀티 태스크 선택이 단일 레벨로 제한되는지, 아니면 여러 레벨에 걸쳐 가능한지 제어합니다.

@signature: multiselect_one_level: boolean

### Example

~~~jsx
gantt.config.multiselect_one_level = true; 
gantt.init('gantt_here');

//잘못된 예
gantt.config.multiselect = false;  /*!*/ //멀티 선택이 꺼져 있음
gantt.config.multiselect_one_level = true; 
gantt.init('gantt_here');
~~~

**Default value:** false

### Details

:::note

이 설정은 [multiselect](api/config/multiselect.md) 옵션이 활성화된 경우에만 적용됩니다.
 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- [멀티 태스크 선택](guides/multiselection.md)

