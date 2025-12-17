---
sidebar_label: copy
title: copy method
description: "creates a deep copy of provided object"
---

# copy

### Description

@short: Creates a deep copy of provided object

@signature: copy: (initialObject: any) =\> any

### Parameters

- `initialObject` - (required) *object* - the object that needs to be copied

### Returns
- ` clonedObject` - (object) - a deep copy of provided object

### Example

~~~jsx
var backupTask = gantt.copy(gantt.getTask(id));
~~~

### Change log
- added in version 4.0
