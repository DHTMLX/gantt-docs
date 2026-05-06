---
sidebar_label: getClosestWorkTime
title: getClosestWorkTime method
description: "가장 가까운 근무 시간을 반환합니다"
---

# getClosestWorkTime

### Description

@short: 가장 가까운 근무 시간을 반환합니다

@signature: getClosestWorkTime: (config: object) => Date

### Parameters

- `config` - (required) *object* - 구성 객체 또는 날짜

### Returns
- ` date` - (Date) - 가장 가까운 근무 시간의 Date 객체

### Example

~~~jsx
// 지정된 날짜가 전역 설정의 근무일인지 확인합니다
gantt.getClosestWorkTime({date:new Date(2019,04,26)});
// or
gantt.getClosestWorkTime(new Date(2019,04,26));

// 지정된 날짜가 특정 작업의 근무일인지 확인합니다
gantt.getClosestWorkTime({ date: new Date(2019,04,26), task:task });
~~~

### Details

:::note
[work_time](api/config/work_time.md) 옵션이 비활성화되어 있으면, 메서드는 날짜를 원래대로 반환합니다.
:::

- 작업이 지정되지 않은 경우 메서드는 [global work time calendar](guides/working-time.md#getting-calendars)를 사용합니다.
- 또한, 이 메서드는 [calendar object](api/other/calendar.md)에서 직접 호출될 수 있습니다.

## 설정 객체 속성 {#configurationobjectproperties}

구성 객체에는 다음 속성이 포함될 수 있습니다:

<table class="list" cellspacing="0" cellpadding="5" border="0">
	<thead>
	<tr>
		<th>
			Property 
		</th>
		<th>
			Description
		</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td rowspan="2" style="text-align:center"><b id="date">date</b></td>
  <td>가장 가까운 근무 시간을 얻으려는 날짜</td>
  </tr>
  <tr>
		<td colspan="2">
~~~js
gantt.getClosestWorkTime({
	date:new Date(2019,04,26),
    dir:"future"
});
 // -> Mon May 27 2019 00:00:00 if duration_unit="day"
 // -> Mon May 27 2019 08:00:00 if duration_unit="hour"
~~~
		</td>
	</tr>
  <tr>
		<td rowspan="2" style="text-align:center"><b id="dir">dir</b></td>
  <td> (<i>'future'</i> or <i>'past'</i>) 가장 가까운 시간의 방향을 지정합니다</td>
  </tr>
  <tr>
		<td colspan="2" style="text-align:left !important; ">
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
		<td rowspan="2" style="text-align:center"><b id="unit">unit</b></td>
  <td> 가장 가까운 근무 시간을 찾기 위한 시간 단위</td>
  </tr>
  <tr>
		<td colspan="2" style="text-align:left !important; ">
~~~js
//가장 가까운 근무 시간을 찾습니다
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
		<td colspan="2" style="text-align:left !important; ">
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

~~~js
gantt.getClosestWorkTime({
    date:new Date(2019,04,26),
    dir:"future"
});
// -> Mon May 27 2019 00:00:00 if duration_unit="day"
// -> Mon May 27 2019 08:00:00 if duration_unit="hour"
~~~



  dir
  ('future' or 'past') 방향을 지정합니다
  
  
~~~js
gantt.getClosestWorkTime({
    date:new Date(2019,04,18),
    dir:"past"
});
 // -> Sat May 18 2019 00:00:00
~~~


  unit
  가장 가까운 근무 시간을 찾기 위한 시간 단위
  
  
~~~js
//가장 가까운 근무 시간을 찾습니다
gantt.getClosestWorkTime({
    date:new Date(2019,04,18), 
    dir:"future", 
    unit:"hour"
});
 // -> Mon May 20 2019 08:00:00
~~~


  task
  optional, the object of the task the duration of which should be calculated
  
  
~~~js
var closestTime = gantt.getClosestWorkTime({
    date:date, 
    task:task
});
~~~


### Related API
- [work_time](api/config/work_time.md)
- [setWorkTime](api/method/setworktime.md)
- [getWorkHours](api/method/getworkhours.md)

### Related Guides
- [작업 시간 계산](guides/working-time.md)

