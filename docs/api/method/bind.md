---
sidebar_label: bind
title: bind method
description: "creates a new function that, when called, has its <i>this</i> keyword set to the provided value"
---

# bind

### Description

@short: Creates a new function that, when called, has its <i>this</i> keyword set to the provided value

@signature: bind: (method: GanttCallback, thisArg: any) =\> GanttCallback

### Parameters

- `method` - (required) *function* - the target function
- `thisArg` - (required) *object* - the value to be passed as the <i>this</i> parameter to the target function when the bound function is called

### Returns
- ` bound_function` - (function) - a new function that, when called, has its <i>this</i> keyword that will be passed to the target function

### Example

~~~jsx
gantt.bind(method, thisArg);
~~~

### Details

The method is used as the IE8 compatible replacement of the
[Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 
function.

### Change log
- added in version 4.0
