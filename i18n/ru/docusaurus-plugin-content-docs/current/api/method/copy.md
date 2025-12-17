---
sidebar_label: copy
title: copy method
description: "создаёт глубокую копию переданного объекта"
---

# copy

### Description

@short: Создаёт глубокую копию переданного объекта

@signature: copy: (initialObject: any) =\> any

### Parameters

- `initialObject` - (required) *object* - объект, который необходимо скопировать

### Returns
- ` clonedObject` - (object) - глубокая копия переданного объекта

### Example

~~~jsx
var backupTask = gantt.copy(gantt.getTask(id));
~~~

### Change log
- added in version 4.0
