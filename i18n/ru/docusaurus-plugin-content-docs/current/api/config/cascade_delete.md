---
sidebar_label: cascade_delete
title: cascade_delete config
description: "включает каскадное удаление вложенных задач и связей"
---

# cascade_delete

### Description

@short: Включает каскадное удаление вложенных задач и связей

@signature: cascade_delete: boolean

### Example

~~~jsx
gantt.config.cascade_delete = false;
gantt.init("gantt_here");
~~~

**Значение по умолчанию:** true

### Details

Добавлено в версии 4.2

### Related Guides
- [Основные операции с задачами](guides/crud-task.md)