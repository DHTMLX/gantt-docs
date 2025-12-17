---
sidebar_label: columnIndexByDate
title: columnIndexByDate method
description: "bietet den Index der Spalte, die einem bestimmten Datum entspricht"
---

# columnIndexByDate

### Description

@short: Bietet den Index der Spalte, die einem bestimmten Datum entspricht

@signature: columnIndexByDate: (date: Date) =\> number

### Parameters

- `date` - (required) *Date* - ein Date-Objekt

### Returns
- ` index` - (number) - der Index der Spalte

### Example

~~~jsx
gantt.columnIndexByDate(new Date(2017, 03, 11)); // ->10
~~~
