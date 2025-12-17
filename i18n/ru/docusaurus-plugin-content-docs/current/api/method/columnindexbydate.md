---
sidebar_label: columnIndexByDate
title: columnIndexByDate method
description: "возвращает индекс колонки, соответствующей заданной дате"
---

# columnIndexByDate

### Description

@short: Возвращает индекс колонки, соответствующей заданной дате

@signature: columnIndexByDate: (date: Date) =\> number

### Parameters

- `date` - (required) *Date* - объект даты

### Returns
- ` index` - (number) - индекс колонки

### Example

~~~jsx
gantt.columnIndexByDate(new Date(2017, 03, 11)); // ->10
~~~
