---
sidebar_label: readonly_property
title: readonly_property config
description: "устанавливает имя свойства, которое контролирует статус readonly для задач и связей"
---

# readonly_property

### Description

@short: Устанавливает имя свойства, которое контролирует статус readonly для задач и связей

@signature: readonly_property: string

### Example

~~~jsx
gantt.config.readonly_property = "property_name";
~~~

### Details

По умолчанию эта опция установлена в значение "readonly".

### Related API
- [editable_property](api/config/editable_property.md)

### Related Guides
- [Режим только для чтения](guides/readonly-mode.md#readonlymodeforspecifictaskslinks)

