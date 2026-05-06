---
sidebar_label: multiselect_one_level
title: multiselect_one_level 구성
description: "다중 작업 선택이 하나의 레벨 내에서 가능할지 아니면 모든 레벨에서 가능할지 여부를 지정합니다"
---

# multiselect_one_level

### Description

@short: 다중 작업 선택이 하나의 레벨 내에서 가능할지 아니면 모든 레벨에서 가능할지 여부를 지정합니다

@signature: multiselect_one_level: boolean

### Example

~~~jsx
gantt.config.multiselect_one_level = true; 
gantt.init('gantt_here');

//INCORRECT
gantt.config.multiselect = false;  /*!*/ //multiselection is disabled
gantt.config.multiselect_one_level = true; 
gantt.init('gantt_here');
~~~

**기본 값:** false

### Details

:::note
이 옵션은 [multiselect](api/config/multiselect.md) 옵션이 활성화될 때에만 의미가 있습니다. 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- [Multi-Task Selection](guides/multiselection.md)