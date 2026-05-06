---
sidebar_label: copy
title: copy method
description: "erstellt eine tiefgehende Kopie des angegebenen Objekts"
---

# copy

### Description

@short: Erstellt eine tiefe Kopie des übergebenen Objekts

@signature: copy: (initialObject: any) =\> any

### Parameters

- `initialObject` - (required) *object* - das Objekt, das kopiert werden muss

### Returns
- ` clonedObject` - (object) - eine tiefe Kopie des übergebenen Objekts

### Example

~~~jsx
var backupTask = gantt.copy(gantt.getTask(id));
~~~

### Change log
- in Version 4.0 hinzugefügt