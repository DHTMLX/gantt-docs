---
sidebar_label: getTaskTop
title: getTaskTop method
description: "gets the top position of the task's DOM element in the timeline area"
---

# getTaskTop

### Description

@short: Gets the top position of the task's DOM element in the timeline area

@signature: getTaskTop: (id: number | string) =\> number

### Parameters

- `id` - (required) *number | string* -    the task's id

### Returns
- `top` - (number) - the CSS top position the task's DOM element in pixels

### Example

~~~jsx
gantt.getTaskTop(2);
~~~

### Related API
- [getTaskPosition](api/method/gettaskposition.md)

