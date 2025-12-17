---
sidebar_label: getTaskHeight
title: getTaskHeight method
description: "возвращает видимую высоту задачи"
---

# getTaskHeight

### Description

@short: Возвращает видимую высоту задачи

@signature: getTaskHeight: (id?: string | number) =\> number

### Parameters

- `id` - (optional) *string | number* -    идентификатор задачи

### Returns
- ` height` - (number) - высота указанной задачи или, если параметр <i>id</i> не передан, высота задач

### Example

~~~jsx
const height = gantt.getTaskHeight(); // -> 30
~~~
