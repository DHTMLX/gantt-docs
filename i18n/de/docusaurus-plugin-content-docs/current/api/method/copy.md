---
sidebar_label: copy
title: copy method
description: "erstellt eine tiefgehende Kopie des angegebenen Objekts"
---

# copy

### Description

@short: Erstellt eine tiefgehende Kopie des angegebenen Objekts

@signature: copy: (initialObject: any) =\> any

### Parameters

- `initialObject` - (required) *object* - das zu kopierende Objekt

### Returns
- ` clonedObject` - (object) - eine tiefgehende Kopie des angegebenen Objekts

### Example

~~~jsx
var backupTask = gantt.copy(gantt.getTask(id));
~~~

### Change log
- hinzugefügt in Version 4.0
