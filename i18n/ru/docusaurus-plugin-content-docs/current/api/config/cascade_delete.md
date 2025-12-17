---
sidebar_label: cascade_delete
title: cascade_delete config
description: "позволяет автоматически удалять вложенные задачи и связи при удалении родительской задачи"
---

# cascade_delete

### Description

@short: Позволяет автоматически удалять вложенные задачи и связи при удалении родительской задачи

@signature: cascade_delete: boolean

### Example

~~~jsx
gantt.config.cascade_delete = false;
gantt.init("gantt_here");
~~~

**Default value:** true

### Details

введено в версии 4.2

### Related Guides
- [Базовые операции с задачами](guides/crud-task.md#cascadedeletingofnestedtasks)
