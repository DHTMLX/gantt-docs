---
sidebar_label: editable_property
title: editable_property конфигурация
description: "изменяет имя свойства, которое влияет на возможность редактирования задач/ссылок в режиме только для чтения диаграммы Ганта"
---

# editable_property

### Description

@short: Изменяет имя свойства, которое влияет на возможность редактирования задач/ссылок в режиме только для чтения диаграммы Ганта

@signature: editable_property: string

### Example

~~~jsx
gantt.config.editable_property = "property_name";
~~~

### Details

Значение по умолчанию этой опции — "editable".

### Related API
- [readonly_property](api/config/readonly_property.md)

### Related Guides
- [Режим только для чтения](guides/readonly-mode.md#readonlymodefortheentiregantt)