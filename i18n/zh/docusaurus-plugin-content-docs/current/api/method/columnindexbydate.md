---
sidebar_label: columnIndexByDate
title: columnIndexByDate method
description: "提供对应于给定日期的列索引"
---

# columnIndexByDate

### Description

@short: 提供对应于给定日期的列索引

@signature: columnIndexByDate: (date: Date) =\> number

### Parameters

- `date` - (required) *Date* - 一个日期对象

### Returns
- ` index` - (number) - 列的索引

### Example

~~~jsx
gantt.columnIndexByDate(new Date(2017, 03, 11)); // ->10
~~~
