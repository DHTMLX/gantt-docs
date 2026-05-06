---
sidebar_label: getTaskTop
title: getTaskTop 메서드
description: "타임라인 영역에서 태스크의 DOM 요소의 상단 위치를 가져옵니다"
---

# getTaskTop

### Description

@short: 타임라인 영역에서 태스크의 DOM 요소의 상단 위치를 가져옵니다

@signature: getTaskTop: (id: number | string) =\> number

### Parameters

- `id` - (required) *number | string* - 태스크의 id

### Returns
- `\`top\` - (number) - 태스크의 DOM 요소의 CSS top 위치(픽셀 단위)

### Example

~~~jsx
gantt.getTaskTop(2);
~~~

### Related API
- [getTaskPosition](api/method/gettaskposition.md)