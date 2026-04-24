---
sidebar_label: getTaskHeight
title: Метод getTaskHeight
description: "Возвращает видимую высоту задачи"
---

# getTaskHeight

### Description

@short: Возвращает видимую высоту задачи

@signature: getTaskHeight: (id?: string | number) =\> number

### Parameters
- `task` - (необязательно) *string | number* - идентификатор задачи
### Returns
- ` height` - (number) - высота указанной задачи или, если параметр <i>id</i> не указан, высота задач

### Example

~~~jsx
const height = gantt.getTaskHeight(); // -> 30
~~~