---
sidebar_label: defined
title: defined method
description: "Gibt false zurück, wenn das übergebene Argument undefiniert ist, andernfalls true"
---

# defined

### Description

@short: Gibt false zurück, wenn das übergebene Argument undefiniert ist, andernfalls true

@signature: defined: (param: any) =\> boolean

### Parameters

- `param` - (required) *any* - eine Eigenschaft eines Objekts, die geprüft werden soll

### Returns
- ` state` - (boolean) - false, wenn das übergebene Argument undefiniert ist, andernfalls true

### Example

~~~jsx
// überprüft, ob die Eigenschaft "custom_property" im task-Objekt existiert
if(gantt.defined(task.custom_property)){
  // ..
};
~~~

### Change log
- hinzugefügt in Version 4.0