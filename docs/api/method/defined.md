---
sidebar_label: defined
title: defined method
description: "returns false if the provided argument is undefined, otherwise true"
---

# defined

### Description

@short: Returns false if the provided argument is undefined, otherwise true

@signature: defined: (param: any) =\> boolean

### Parameters

- `param` - (required) *any* - a property of an object that should be checked

### Returns
- ` state` - (boolean) - false if the provided argument is undefined, otherwise true

### Example

~~~jsx
// check if the "custom_property" property is defined for the task object
if(gantt.defined(task.custom_property)){
  // ..
};
~~~

### Change log
- added in version 4.0
