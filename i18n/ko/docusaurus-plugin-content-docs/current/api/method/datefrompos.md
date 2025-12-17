---
sidebar_label: dateFromPos
title: dateFromPos method
description: "차트 영역 내 주어진 가로 위치에 해당하는 날짜를 가져옵니다"
---

# dateFromPos

### Description

@short: 차트 영역 내 주어진 가로 위치에 해당하는 날짜를 가져옵니다

@signature: dateFromPos: (pos: number) =\> Date

### Parameters

- `pos` - (required) *number* - 날짜를 찾을 상대적인 가로 위치

### Returns
- ` date` - (Date) - 차트 영역 내 지정된 가로 위치에 해당하는 날짜

### Example

~~~jsx
var date = gantt.dateFromPos(200);
~~~

### Details

:::note

이 메서드는 현재 간트 차트에 표시된 날짜를 반환합니다. 지정된 위치의 날짜가 차트에 표시되지 않는 경우 'null'을 반환합니다.
 
:::

![gantt_localized](/img/gantt_localized.png)

위에 표시된 간트 차트를 예로 들면, 메서드는 다음과 같은 값을 반환합니다:

~~~js
gantt.dateFromPos(0); // -> Sun Mar 31 2013 00:00:00
gantt.dateFromPos(74);  // -> Mon Apr 01 2013 01:22:17
~~~

### Related API
- [getLayoutView](api/method/getlayoutview.md)

