---
sidebar_label: defined
title: defined method
description: "gibt false zurück, wenn das übergebene Argument undefined ist, und true sonst"
---

# defined

### Description

@short: Gibt false zurück, wenn das übergebene Argument undefined ist, und true sonst

@signature: defined: (param: any) =\> boolean

### Parameters

- `param` - (required) *any* - die Eigenschaft eines Objekts, die überprüft werden soll

### Returns
- ` state` - (boolean) - false, wenn das Argument undefined ist, true, wenn es einen Wert hat

### Example

~~~jsx
// überprüft, ob die Eigenschaft "custom_property" im task-Objekt existiert
if(gantt.defined(task.custom_property)){
  // ..
};
~~~

### Change log
- hinzugefügt in Version 4.0
