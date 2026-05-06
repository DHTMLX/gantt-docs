---
sidebar_label: posFromDate
title: posFromDate method
description: "차트 영역에서 지정된 날짜의 상대적 수평 위치를 가져옵니다"
---

# posFromDate

### Description

@short: 차트 영역에서 지정된 날짜의 상대 수평 위치를 가져옵니다

@signature: posFromDate: (date: Date) =\> number

### Parameters

- `date` - (required) *Date* - 위치를 알고 싶은 날짜

### Returns
- ` position` - (number) - 타임라인에서 지정된 날짜의 x 좌표(픽셀 단위)

### Example

~~~jsx
gantt.posFromDate(new Date());
~~~

### Details

:::note
메서드는 현재 Gantt 차트에 렌더링된 날짜의 위치를 반환합니다. 차트에 렌더링되지 않은 날짜의 경우, 메서드는 'null'을 반환합니다.
:::

예를 들어 위의 Gantt 차트의 경우, 메서드는 다음 값을 반환합니다:

~~~js
gantt.posFromDate(new Date(2023,02,31)); // -> 0
gantt.posFromDate(new Date(2023,03,1));  // -> 74
gantt.posFromDate(new Date(2023,03,2));  // -> 148
~~~

### Related API
- [getLayoutView](api/method/getlayoutview.md)