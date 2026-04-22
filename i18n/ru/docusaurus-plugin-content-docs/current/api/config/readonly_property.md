---
sidebar_label: readonly_property
title: readonly_property конфигурация
description: "изменяет имя свойства, которое влияет на режим только для чтения задач/ссылок"
---

# readonly_property

### Description

@short: Изменяет имя свойства, влияющее на режим только чтения задач/ссылок

@signature: readonly_property: string

### Example

~~~jsx
gantt.config.readonly_property = "property_name";
~~~

### Details

Значение по умолчанию для этой опции — "readonly".

### Related API
- [editable_property](api/config/editable_property.md)

### Related Guides
- [Read-Only Mode](guides/readonly-mode.md)