---
sidebar_label: unsetWorkTime
title: unsetWorkTime method
description: "Gantt 차트에서 작업 시간 설정을 제거합니다."
---

# unsetWorkTime

### Description

@short: Gantt 차트에서 작업 시간 설정을 제거합니다.

@signature: unsetWorkTime: (config: object) =\> void,

### Parameters

- `config` - (required) *object* - 시간 범위를 정의하는 설정 객체

### Example

~~~jsx
gantt.config.work_time = true;
 
// 평일 작업 시간을 ["8:00-17:00"]에서 ["9:00-18:00"]로 업데이트합니다.
gantt.setWorkTime({ hours:["9:00-18:00"] });
// 작업 시간 구성을 제거합니다.
gantt.unsetWorkTime({ hours:["9:00-18:00"] });
~~~

### Related samples
- [Calculate working hours](https://docs.dhtmlx.com/gantt/samples/09_worktime/01_working_hours_per_day.html)

### Details

버전 4.1에 추가됨

- 특정 작업이 제공되지 않은 경우, 이 메서드는 [글로벌 작업 시간 캘린더](guides/working-time.md#multipleworktimecalendars)를 적용합니다. <br>
- 또한, [캘린더 객체](api/other/calendar.md)에서 직접 호출할 수 있습니다.


## 설정 객체 속성 {#configurationobjectproperties}

설정 객체에는 다음과 같은 속성이 포함될 수 있습니다:

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
  <td rowspan="2"><b id="day">day</b></td>
  <td> 요일 번호 [0 (<i>일요일</i>) - 6 (<i>토요일</i>)]. 한 번에 하나의 요일만 설정할 수 있습니다.</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
// 모든 월요일을 비작업일로 표시합니다.
gantt.unsetWorkTime({ day:1, hours:false }); 
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="date">date</b></td>
  <td> 작업일 또는 휴일로 지정할 특정 날짜</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
// 특정 날짜를 휴일로 표시합니다.
gantt.unsetWorkTime({date:new Date(2013,0,1), hours:false})
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="hours">hours</b></td>
  <td> '시작'-'종료' 구간으로 표현된 작업 시간 배열. <br><i>'false'</i>는 휴일을 의미하며, <i>'true' (기본값)</i>는 기본 작업 시간 (["8:00-17:00"])을 적용합니다.</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
// 금요일 오전 8시부터 12시까지 작업 시간을 제거합니다.
gantt.unsetWorkTime({day : 5, hours : ["8:00-12:00"]});
~~~
  </td>
  </tr>
  </tbody>
</table>

### Related API
- [work_time](api/config/work_time.md)
- [setWorkTime](api/method/setworktime.md)
- [isWorkTime](api/method/isworktime.md)

### Related Guides
- [작업 시간 계산](guides/working-time.md#unsettingtheworkingtime)

