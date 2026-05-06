---
sidebar_label: mixin
title: метод mixin
description: "добавляет свойства объекта 'source' в объект 'target'"
---

# mixin

### Description

@short: Добавляет свойства объекта 'source' в объект 'target'

@signature: mixin: (target: CustomObject, source: CustomObject, force?: boolean) =\> void

### Parameters

- `target` - (required) *CustomObject* - целевой объект
- `source` - (required) *CustomObject* - исходный объект
- `force` -		(optional)	*boolean*	- необязательный параметр; если true, свойства 'source' перезапишут совпадающие свойства 'target', если таковые имеются. Если false (по умолчанию), свойства, которые уже существуют в 'target', будут пропущены	

### Example

~~~jsx
gantt.mixin(target, source, force);
~~~

### Change log
- добавлено в версии 4.0