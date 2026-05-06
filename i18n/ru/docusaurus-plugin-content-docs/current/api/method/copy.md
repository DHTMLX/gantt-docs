---
sidebar_label: copy
title: метод copy
description: "Создает глубокую копию переданного объекта"
---

# copy

### Description

@short: Создает глубокую копию переданного объекта

@signature: copy: (initialObject: any) =\> any

### Parameters

- `initialObject` - (required) *объект* - объект, который нужно скопировать

### Returns
- ` clonedObject` - (объект) - глубокая копия переданного объекта

### Example

~~~jsx
var backupTask = gantt.copy(gantt.getTask(id));
~~~

### Change log
- добавлено в версии 4.0