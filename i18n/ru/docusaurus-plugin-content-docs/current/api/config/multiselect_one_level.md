---
sidebar_label: multiselect_one_level
title: multiselect_one_level config
description: "управляет тем, ограничивается ли множественный выбор задач одним уровнем или может охватывать несколько уровней"
---

# multiselect_one_level

### Description

@short: Управляет тем, ограничивается ли множественный выбор задач одним уровнем или может охватывать несколько уровней

@signature: multiselect_one_level: boolean

### Example

~~~jsx
gantt.config.multiselect_one_level = true; 
gantt.init('gantt_here');

//НЕПРАВИЛЬНО
gantt.config.multiselect = false;  /*!*/ //множественный выбор отключен
gantt.config.multiselect_one_level = true; 
gantt.init('gantt_here');
~~~

**Default value:** false

### Details

:::note

Этот параметр применяется только при включенной опции [multiselect](api/config/multiselect.md).
 
:::

### Related API
- [eachSelectedTask](api/method/eachselectedtask.md)
- [getLastSelectedTask](api/method/getlastselectedtask.md)
- [getSelectedTasks](api/method/getselectedtasks.md)
- [multiselect](api/config/multiselect.md)
- [isSelectedTask](api/method/isselectedtask.md)
- [toggleTaskSelection](api/method/toggletaskselection.md)

### Related Guides
- [Множественный выбор задач](guides/multiselection.md)

