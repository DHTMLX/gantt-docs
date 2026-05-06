---
sidebar_label: dateFromPos
title: dateFromPos method
description: "차트 영역에서 지정된 수평 위치의 날짜를 가져옵니다"
---

# dateFromPos

### Description

@short: 차트 영역에서 지정된 수평 위치의 날짜를 가져옵니다

@signature: dateFromPos: (pos: number) => Date

### Parameters

- `pos` - (required) *number* - 차트를 기준으로 확인하고자 하는 상대 수평 위치

### Returns
- ` date` - (Date) - 차트 영역에서 지정된 수평 위치의 날짜

### Example

~~~jsx
var date = gantt.dateFromPos(200);
~~~

### Details

:::note
메서드는 Gantt 차트에 현재 렌더링되어 있는 날짜를 반환합니다. 차트에 렌더링되지 않은 날짜가 있을 경우 - 메서드는 'null'을 반환합니다.
:::

예를 들어 위의 Gantt 차트에서 이 메서드는 다음을 반환합니다:

~~~js
gantt.dateFromPos(0); // -> 일요일 2013년 3월 31일 00:00:00
gantt.dateFromPos(74);  // -> 월요일 2013년 4월 1일 01:22:17
~~~

### Related API
- [getLayoutView](api/method/getlayoutview.md)