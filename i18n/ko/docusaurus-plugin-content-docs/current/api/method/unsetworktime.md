---
sidebar_label: unsetWorkTime
title: unsetWorkTime method
description: "Gantt 차트에서 근무 시간을 해제합니다"
---

# unsetWorkTime

### Description

@short: Gantt 차트에서 근무 시간을 해제합니다

@signature: unsetWorkTime: (config: object) => void

### Parameters

- `config` - (required) *object* - 시간 범위의 구성 객체

### Example

~~~jsx
gantt.config.work_time = true;
 
// 근무일의 근무 시간을 [\"8:00-17:00\"]에서 [\"9:00-18:00\"]로 변경
gantt.setWorkTime({ hours: [\"9:00-18:00\"] });
// 근무 시간을 해제합니다
gantt.unsetWorkTime({ hours: [\"9:00-18:00\"] });
~~~

### Related samples
- [근무 시간 계산](https://docs.dhtmlx.com/gantt/samples/09_worktime/01_working_hours_per_day.html)

### Details

버전 4.1에 추가됨

- 특정 작업이 제공되지 않은 경우, 이 메서드는 [글로벌 작업 시간 캘린더](guides/working-time.md#multipleworktimecalendars)를 적용합니다. <br>
- 또한, [캘린더 객체](api/other/calendar.md)에서 직접 호출할 수 있습니다.


## 설정 객체 속성 {#configurationobjectproperties}


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
  <td> 주 중의 요일 번호 [0 (<i>일요일</i>) - 6 (<i>토요일</i>)]. 참고: 한 번에 1일만 설정할 수 있습니다</td>
  </tr>
  <tr>
        <td colspan="2" style="text-align:left !important; ">
~~~js
// 월요일의 근무 시간을 해제합니다
gantt.unsetWorkTime({ day: 1, hours: false }); 
~~~
        </td>
    </tr>
    <tr>
        <td rowspan="2"><b id="date">date</b></td>
  <td> 근무 시간을 설정/해제할 특정 날짜</td>
  </tr>
  <tr>
        <td colspan="2" style="text-align:left !important; ">
~~~js
// 특정 날짜의 근무 시간을 해제합니다
gantt.unsetWorkTime({ 
    date: new Date(2025, 11, 1), 
    hours: false 
});
~~~
        </td>
    </tr>
  <tr>
        <td rowspan="2"><b id="hours">hours</b></td>
  <td> 'from'-'to' 쌍으로 된 근무 시간 배열. <br/><i>'false'</i> 값은 근무 시간을 해제하고, <i>'true' (기본값)</i>은 기본 근무 시간(["8:00-17:00"])를 적용합니다</td>
  </tr>
  <tr>
        <td colspan="2" style="text-align:left !important; ">
~~~js
// 금요일의 8:00-12:00 근무 시간을 해제합니다
gantt.unsetWorkTime({ day : 5, hours : ["8:00-12:00"] });
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
- [근무 시간 계산](guides/working-time.md#unsetting-the-working-time)