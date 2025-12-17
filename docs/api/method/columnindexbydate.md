---
sidebar_label: columnIndexByDate
title: columnIndexByDate method
description: "returns the index of the column by the date"
---

# columnIndexByDate

### Description

@short: Returns the index of the column by the date

@signature: columnIndexByDate: (date: Date) =\> number

### Parameters

- `date` - (required) *Date* - a date object

### Returns
- ` index` - (number) - the index of the column

### Example

~~~jsx
gantt.columnIndexByDate(new Date(2017, 03, 11)); // ->10
~~~
