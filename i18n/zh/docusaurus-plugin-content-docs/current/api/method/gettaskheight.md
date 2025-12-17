---
sidebar_label: getTaskHeight
title: getTaskHeight method
description: "提供任务的可见高度"
---

# getTaskHeight

### Description

@short: 提供任务的可见高度

@signature: getTaskHeight: (id?: string | number) =\> number

### Parameters

- `id` - (optional) *string | number* -    任务的 id

### Returns
- ` height` - (number) - 指定任务的高度，或者如果未提供 <i>id</i> 参数，则返回任务的高度

### Example

~~~jsx
const height = gantt.getTaskHeight(); // -> 30
~~~
