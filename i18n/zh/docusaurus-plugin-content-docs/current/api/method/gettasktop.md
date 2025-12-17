---
sidebar_label: getTaskTop
title: getTaskTop method
description: "获取任务DOM元素在时间轴区域内的顶部位置"
---

# getTaskTop

### Description

@short: 获取任务DOM元素在时间轴区域内的顶部位置

@signature: getTaskTop: (id: number | string) =\> number

### Parameters

- `id` - (required) *number | string* -    任务的ID

### Returns
- ` top` - (number) - 任务DOM元素的CSS top位置，单位为像素

### Example

~~~jsx
gantt.getTaskTop(2);
~~~

### Related API
- [getTaskPosition](api/method/gettaskposition.md)

