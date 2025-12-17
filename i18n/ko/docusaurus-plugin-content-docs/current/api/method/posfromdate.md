---
sidebar_label: posFromDate
title: posFromDate method
description: "차트 영역 내 특정 날짜의 상대적인 가로 위치를 가져옵니다"
---

# posFromDate

### Description

@short: 차트 영역 내 특정 날짜의 상대적인 가로 위치를 가져옵니다

@signature: posFromDate: (date: Date) =\> number

### Parameters

- `date` - (required) *Date* - 위치가 필요한 날짜

### Returns
- ` position` - (number) - 타임라인 상 지정된 날짜의 x좌표(픽셀 단위)

### Example

~~~jsx
gantt.posFromDate(new Date());
~~~

### Details

:::note

이 메서드는 현재 Gantt 차트에 표시된 날짜의 위치를 제공합니다. 차트에 날짜가 보이지 않는 경우 'null'을 반환합니다.
 
:::

![gantt_localized](/img/gantt_localized.png)

위에 표시된 Gantt 차트의 경우, 메서드는 다음과 같은 결과를 반환합니다:

~~~js
gantt.posFromDate(new Date(2023,02,31)); // -> 0
gantt.posFromDate(new Date(2023,03,1));  // -> 74
gantt.posFromDate(new Date(2023,03,2));  // -> 148
~~~

### Related API
- [getLayoutView](api/method/getlayoutview.md)

