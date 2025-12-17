---
sidebar_label: mixin
title: mixin method
description: "сливает свойства из объекта 'source' в объект 'target'"
---

# mixin

### Description

@short: Сливает свойства из объекта 'source' в объект 'target'

@signature: mixin: (target: CustomObject, source: CustomObject, force?: boolean) =\> void

### Parameters

- `target` - (required) *CustomObject* - объект, который будет получать новые свойства
- `source` - (required) *CustomObject* - объект, предоставляющий свойства для добавления
- `force` - (optional) *boolean* - опционально, если true, свойства из 'source' заменят свойства в 'target' при совпадении ключей. По умолчанию false, поэтому существующие свойства в 'target' остаются без изменений

### Example

~~~jsx
gantt.mixin(target, source, force);
~~~

### Change log
- добавлено в версии 4.0
