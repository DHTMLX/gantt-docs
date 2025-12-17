---
sidebar_label: getTaskHeight
title: getTaskHeight method
description: "작업의 보이는 높이를 제공합니다."
---

# getTaskHeight

### Description

@short: 작업의 보이는 높이를 제공합니다.

@signature: getTaskHeight: (id?: string | number) =\> number

### Parameters

- `id` - (optional) *string | number* -    작업의 ID

### Returns
- ` height` - (number) - 지정된 작업의 높이 또는 <i>id</i> 파라미터가 제공되지 않은 경우 작업들의 높이

### Example

~~~jsx
const height = gantt.getTaskHeight(); // -> 30
~~~
