---
sidebar_label: getTaskTop
title: getTaskTop method
description: "타임라인 영역 내에서 작업의 DOM 요소의 상단 위치를 가져옵니다."
---

# getTaskTop

### Description

@short: 타임라인 영역 내에서 작업의 DOM 요소의 상단 위치를 가져옵니다.

@signature: getTaskTop: (id: number | string) =\> number

### Parameters

- `id` - (required) *number | string* -    작업의 ID

### Returns
- ` top` - (number) - 작업 DOM 요소의 CSS top 위치(pixel 단위)

### Example

~~~jsx
gantt.getTaskTop(2);
~~~

### Related API
- [getTaskPosition](api/method/gettaskposition.md)

