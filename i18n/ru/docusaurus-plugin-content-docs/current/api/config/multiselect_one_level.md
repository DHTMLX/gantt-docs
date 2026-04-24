---
sidebar_label: multiselect_one_level
title: multiselect_one_level config
description: "указывает, будет ли доступен выбор нескольких задач на одном уровне или на любом уровне"
---

# multiselect_one_level

### Description

@short: Указывает, будет ли доступен выбор нескольких задач на одном уровне или на любом уровне

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

**Значение по умолчанию:** false

### Details

:::note
Опция имеет смысл только когда включена опция [multiselect](api/config/multiselect.md). 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- [Выбор нескольких задач](guides/multiselection.md)