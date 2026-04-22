---
sidebar_label: getTaskHeight
title: getTaskHeight 方法
description: "任务的可见高度"
---

# getTaskHeight

### Description

@short: 返回任务的可见高度

@signature: getTaskHeight: (id?: string | number) =\> number

### Parameters
- `task` - (optional) *string | number* - 该任务的 ID

### Returns
- ` height` - (number) - 指定任务的高度，若未指定 <i>id</i> 参数，则为所有任务的高度

### Example

~~~jsx
const height = gantt.getTaskHeight(); // -> 30
~~~