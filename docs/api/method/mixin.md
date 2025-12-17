---
sidebar_label: mixin
title: mixin method
description: "adds properties of the 'source' object into the 'target' object"
---

# mixin

### Description

@short: Adds properties of the 'source' object into the 'target' object

@signature: mixin: (target: CustomObject, source: CustomObject, force?: boolean) =\> void

### Parameters

- `target` - (required) *CustomObject* - the target object
- `source` - (required) *CustomObject* - the source object
- `force` -		(optional)	*boolean*	-	optional, if true, properties of the 'source' will overwrite matching properties of the 'target', if there are any. If false (by default), properties that already exist in the 'target' will be omitted	

### Example

~~~jsx
gantt.mixin(target, source, force);
~~~

### Change log
- added in version 4.0
