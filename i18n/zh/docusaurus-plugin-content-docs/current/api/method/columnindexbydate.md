---
sidebar_label: columnIndexByDate
title: columnIndexByDate 方法
description: "根据日期返回列的索引"
---

# columnIndexByDate

### Description

@short: 根据日期返回列的索引

@signature: columnIndexByDate: (date: Date) => number

### Parameters

- `date` - (required) *Date* - 一个日期对象

### Returns
- `index` - (数字) - 列的索引

### Example

~~~jsx
gantt.columnIndexByDate(new Date(2017, 03, 11)); // ->10
~~~