---
sidebar_label: getClosestWorkTime
title: getClosestWorkTime method
description: "가장 가까운 작업 시간을 반환합니다"
---

# getClosestWorkTime

### Description

@short: 가장 가까운 작업 시간을 반환합니다

@signature: getClosestWorkTime: Calendar['getClosestWorkTime']

### Parameters

- `config` - (required) *object* - 설정 객체 또는 날짜

### Returns
- ` date` - (Date) - 가장 가까운 작업 시간을 나타내는 Date 객체

### Example

~~~jsx
// 전역 설정에 따라 주어진 날짜가 작업일인지 확인합니다
gantt.getClosestWorkTime({date:new Date(2019,04,26)});
// 또는
gantt.getClosestWorkTime(new Date(2019,04,26));

// 특정 작업에 대해 주어진 날짜가 작업일인지 확인합니다
gantt.getClosestWorkTime({ date: new Date(2019,04,26), task:task });
~~~

### Details

:::note

[work_time](api/config/work_time.md) 옵션이 비활성화된 경우, 이 메서드는 날짜를 변경 없이 반환합니다.
 
:::

- task가 제공되지 않으면 이 메서드는 [글로벌 작업 시간 캘린더](guides/working-time.md#multipleworktimecalendars)를 사용합니다. <br>
- 또한, 이 메서드는 [캘린더 객체](api/other/calendar.md)에서 직접 호출할 수도 있습니다.

## 설정 객체 속성 {#configurationobjectproperties}

설정 객체는 다음 속성을 포함할 수 있습니다:

<table class="list" cellspacing="0" cellpadding="5" border="0">
  <thead>
  <tr>
  <th>
  속성 
  </th>
  <th>
  설명
  </th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td rowspan="2"><b id="date">date</b></td>
  <td>가장 가까운 작업 시간을 요청하는 날짜</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
gantt.getClosestWorkTime({
    date:new Date(2019,04,26),
    dir:"future"
});
// -> duration_unit이 "day"인 경우 Mon May 27 2019 00:00:00
// -> duration_unit이 "hour"인 경우 Mon May 27 2019 08:00:00
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="dir">dir</b></td>
  <td> (<i>'future'</i> 또는 <i>'past'</i>) 가장 가까운 시간을 찾을 방향을 지정</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
gantt.getClosestWorkTime({
    date:new Date(2019,04,18),
    dir:"past"
});
// -> Sat May 18 2019 00:00:00
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="unit">unit</b></td>
  <td>가장 가까운 작업 시간을 찾을 때 사용하는 시간 단위</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
// 가장 가까운 작업 시간을 시간 단위로 찾음
gantt.getClosestWorkTime({
    date:new Date(2019,04,18), 
    dir:"future", 
    unit:"hour"
});
// -> Mon May 20 2019 08:00:00
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="unit">task</b></td>
  <td>선택 사항, 기간 계산에 사용할 작업 객체</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
var closestTime = gantt.getClosestWorkTime({
    date:date, 
    task:task
});
~~~
  </td>
  </tr>
  </tbody>
</table>

### Related API
- [work_time](api/config/work_time.md)
- [setWorkTime](api/method/setworktime.md)
- [getWorkHours](api/method/getworkhours.md)

### Related Guides
- [작업 시간 계산](guides/working-time.md)

