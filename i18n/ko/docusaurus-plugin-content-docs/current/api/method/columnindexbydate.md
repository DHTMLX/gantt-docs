---
sidebar_label: columnIndexByDate
title: columnIndexByDate method
description: "주어진 날짜에 해당하는 컬럼의 인덱스를 제공합니다."
---

# columnIndexByDate

### Description

@short: 주어진 날짜에 해당하는 컬럼의 인덱스를 제공합니다.

@signature: columnIndexByDate: (date: Date) =\> number

### Parameters

- `date` - (required) *Date* - 날짜 객체

### Returns
- ` index` - (number) - 컬럼의 인덱스

### Example

~~~jsx
gantt.columnIndexByDate(new Date(2017, 03, 11)); // ->10
~~~
