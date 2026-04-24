---
sidebar_label: getTaskTop
title: getTaskTop 方法
description: "获取任务的 DOM 元素在时间线区域的顶部位置"
---

# getTaskTop

### Description

@short: 获取任务的 DOM 元素在时间线区域的顶部位置

@signature: getTaskTop: (id: number | string) =\> number

### Parameters

- `id` - (required) *number | string* - 该任务的 ID

### Returns
- `top` - (number) - 该任务的 DOM 元素在 CSS top 位置的像素值

### Example

~~~jsx
gantt.getTaskTop(2);
~~~

### Related API
- [getTaskPosition](api/method/gettaskposition.md)