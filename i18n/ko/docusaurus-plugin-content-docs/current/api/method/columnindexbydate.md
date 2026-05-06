---
sidebar_label: columnIndexByDate
title: columnIndexByDate 메서드
description: "날짜로 열의 인덱스를 반환합니다"
---

# columnIndexByDate

### Description

@short: 날짜로 열의 인덱스를 반환합니다

@signature: columnIndexByDate: (date: Date) =\> number

### Parameters

- `date` - (필수) *Date* - 날짜 객체

### Returns
- ` index` - (number) - 열의 인덱스

### Example

~~~jsx
gantt.columnIndexByDate(new Date(2017, 03, 11)); // ->10
~~~