---
sidebar_label: columnIndexByDate
title: columnIndexByDate method
description: "возвращает индекс столбца по дате"
---

# columnIndexByDate

### Description

@short: Возвращает индекс столбца по дате

@signature: columnIndexByDate: (date: Date) =\> number

### Parameters

- `date` - (required) *Date* - объект даты

### Returns
- ` index` - (number) - индекс столбца

### Example

~~~jsx
gantt.columnIndexByDate(new Date(2017, 03, 11)); // ->10
~~~