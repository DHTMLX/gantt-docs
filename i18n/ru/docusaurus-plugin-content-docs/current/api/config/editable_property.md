---
sidebar_label: editable_property
title: editable_property config
description: "изменяет имя свойства, которое контролирует возможность редактирования задач или связей в режиме только для чтения в Gantt chart"
---

# editable_property

### Description

@short: Изменяет имя свойства, которое контролирует возможность редактирования задач или связей в режиме только для чтения в Gantt chart

@signature: editable_property: string

### Example

~~~jsx
gantt.config.editable_property = "property_name";
~~~

### Details

По умолчанию этот параметр установлен в значение "editable".

### Related API
- [readonly_property](api/config/readonly_property.md)

### Related Guides
- [Режим только для чтения](guides/readonly-mode.md#readonlymodefortheentiregantt)

