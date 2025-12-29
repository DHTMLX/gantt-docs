---
sidebar_label: setWorkTime
title: setWorkTime method
description: "간트 차트의 작업 시간을 설정합니다."
---

# setWorkTime

### Description

@short: 간트 차트의 작업 시간을 설정합니다.

@signature: setWorkTime: (config: object) =\> void

### Parameters

- `config` - (required) *object* - 시간 범위의 구성 객체

### Example

~~~jsx
gantt.config.work_time = true;

//근무일의 근무 시간을 ["8:00-17:00"]에서 ["9:00-18:00"]로 업데이트합니다.
gantt.setWorkTime({ hours:["9:00-18:00"] });
 
//모든 금요일을 비근무일로 표시합니다.
gantt.setWorkTime({ day:5, hours:false });
 
//금요일과 토요일의 근무 시간을 
//["8:00-17:00"]에서 ["8:00-12:00"]로 조정합니다.
gantt.setWorkTime({day : 5, hours : ["8:00-12:00"]});
gantt.setWorkTime({day : 6, hours : ["8:00-12:00"]});
 
//3월 31일을 근무일로 지정합니다.
gantt.setWorkTime({date : new Date(2013, 2, 31)});
 
//1월 1일을 휴일로 설정합니다.
gantt.setWorkTime({date:new Date(2013,0,1), hours:false})

//근무 시간을 두 구간으로 정의합니다: 8:30-12:00, 13:00-17:00 (점심시간 포함)
gantt.setWorkTime({hours : ["8:30-12:00", "13:00-17:00"]})
~~~

### Related samples
- [Calculate working hours](https://docs.dhtmlx.com/gantt/samples/09_worktime/01_working_hours_per_day.html)

### Details

:::note

이 메서드는 [work_time](api/config/work_time.md)가 활성화된 경우에만 작동합니다. 그렇지 않으면 무시됩니다.
 
:::

- 특정 작업이 지정되지 않은 경우, 이 메서드는 [글로벌 작업 시간 캘린더](guides/working-time.md#multipleworktimecalendars)에 적용됩니다. <br>
- 또한, [캘린더 객체](api/other/calendar.md)에서 직접 호출할 수도 있습니다.


기본적으로 작업 시간은 다음과 같이 설정됩니다:

- **근무일**: 월요일부터 금요일까지
- **근무 시간**: 08:00 - 17:00

이 메서드를 사용하여 이러한 기본 설정을 사용자 정의할 수 있습니다.

## 구성 객체 속성 {#configurationobjectproperties}

구성 객체는 다음 속성을 포함할 수 있습니다:

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
  <td> 요일을 나타내는 숫자 [0 (<i>일요일</i>) - 6 (<i>토요일</i>)]. 한 번에 하나의 요일만 설정할 수 있습니다.</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
//모든 월요일을 비근무일로 표시합니다.
gantt.setWorkTime({ day:1, hours:false }); 
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="date">date</b></td>
  <td> 특정 날짜를 근무일 또는 휴일로 설정합니다.</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
//특정 날짜를 휴일로 지정합니다.
gantt.setWorkTime({date:new Date(2013,0,1), hours:false})
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="hours">hours</b></td>
  <td> 'from'-'to' 구간으로 지정된 근무 시간 배열. <br><i>'false'</i>는 휴일 설정, <i>'true' (기본값)</i>는 기본 근무 시간 (["8:00-17:00"])을 적용합니다.</td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
//금요일의 근무 시간을 8:00부터 12:00까지 설정합니다.
gantt.setWorkTime({day : 5, hours : ["8:00-12:00"]});
~~~
  </td>
  </tr>
  <tr>
  <td rowspan="2"><b id="hours">customWeeks</b></td>
  <td> 서로 다른 기간에 대해 다른 작업 시간 규칙을 정의하는 객체.<br> 객체는 key:value 쌍을 포함할 수 있으며, <i>key</i>는 시간 범위 이름, <i>value</i>는 다음 속성을 가진 객체입니다:
  <ul><li><b>from</b> - (<i>Date</i>) 필수, 시간 범위 시작 날짜</li><li><b>to</b> - (<i>Date</i>) 필수, 시간 범위 종료 날짜</li><li><b>hours</b> - (<i>array</i>) 'from'-'to' 구간으로 된 근무 시간 배열. <br><i>'false'</i>는 휴일, <i>'true' (기본값)</i>는 기본 근무 시간 (["8:00-17:00"])</li><li><b>days</b> - (<i>array</i>) 0(일요일)부터 6(토요일)까지 7요소 배열로, 1/true는 근무일, 0/false는 비근무일을 나타냅니다.</li></ul></td>
  </tr>
  <tr>
  <td colspan="2">
~~~js
//겨울철 근무 시간을 수정합니다.
gantt.setWorkTime({
    customWeeks: {
        winter: {
            from: new Date(2018, 11, 1), // 2018년 12월 1일
            to: new Date(2019, 2, 1), // 2019년 3월 1일 00:00
            hours: ["9:00-13:00", "14:00-16:00"],
            days: [ 1, 1, 1, 1, 0, 0, 0]
        }
    }
});
~~~
  </td>
  </tr>
  </tbody>
</table>

## 야간 근무 시간 설정하기

[setWorkTime](api/method/setworktime.md) 구성 객체에서 **hours** 속성을 지정할 때, 구간은 이른 시간부터 늦은 시간 순서로 나열해야 합니다. 내림차순으로 제공하면 일부 구간이 무시될 수 있습니다. 예를 들어, 다음과 같은 경우 `18:00` 이후 구간은 무시됩니다:

~~~js
// 잘못된 설정 예시
gantt.setWorkTime({day : 5, hours : ["16:00-18:00", "14:00-15:00",  "08:00-10:00"]});
gantt.setWorkTime({day : 5, hours : ["16:00-18:00", "00:00-04:00",  "05:00-06:00"]});
~~~

야간 근무 시간을 올바르게 지정하려면, 두 날짜에 나누어 설정해야 합니다:

- 첫째 날 24시간 내 구간
- 다음 날 24시간 내 구간

예:

~~~js
gantt.setWorkTime({day : 5, hours : ["16:00-18:00"]});
gantt.setWorkTime({day : 6, hours : ["00:00-04:00",  "05:00-06:00"]});
~~~

## 작업 시간 규칙 덮어쓰기

같은 날짜에 대해 이 메서드를 여러 번 호출하면, 이전 설정이 덮어써집니다:

~~~js
gantt.setWorkTime({hours:["8:00-12:00"]});
gantt.setWorkTime({hours:["13:00-17:00"]});
// 최종 작업 시간은 13:00-17:00이며,
// 두 구간이 합쳐지지 않습니다.
~~~

## 사용자 정의 근무일 및 휴일 설정

모든 근무일 또는 근무 시간을 제외하는 작업 시간 규칙을 설정할 수 없습니다. 예를 들어, 다음은 작동하지 않습니다:

~~~js
gantt.setWorkTime({ day: 0, hours: [] });
gantt.setWorkTime({ day: 1, hours: [] });
gantt.setWorkTime({ day: 2, hours: [] });
gantt.setWorkTime({ day: 3, hours: [] });
gantt.setWorkTime({ day: 4, hours: [] });
gantt.setWorkTime({ day: 5, hours: [] });
gantt.setWorkTime({ day: 6, hours: [] });
~~~

이 경우, Gantt는 하나의 근무일에 대해 메서드 호출을 무시하며, 해당 요일은 여전히 근무 시간이 있습니다.

이러한 설정에서 날짜 기준 근무 시간이나 기간을 계산하려 하면 유효한 날짜나 기간을 찾을 수 없습니다. 본질적으로 이런 캘린더 구성은 무효합니다. 특정 날짜에 근무 시간이 있더라도, 계산은 근무일과 근무 시간이 포함된 범위 내에서만 올바르게 작동합니다. 범위 밖에서 계산하면 오류나 결과 없음이 발생할 수 있습니다.

몇 개월 또는 몇 년 전체가 비근무일인 캘린더를 만들려면 **setWorkTime()**의 *customWeeks* 옵션을 사용하세요. 필요한 범위 내에서 근무일과 근무 시간을 정의하려면:

- 근무 시간이 없는 기간들로 타임라인을 분할하고
- 필요한 날짜에 대해 근무 시간을 명시적으로 설정합니다.

예시:

~~~js
gantt.setWorkTime({ date: new Date(2025, 3, 10), hours: ["8:00-12:00"] })
gantt.setWorkTime({ date: new Date(2025, 3, 11), hours: ["13:00-17:00"] })

gantt.setWorkTime({
    customWeeks: {
        period1: {
            from: new Date(2025, 3, 1),
            to: new Date(2025, 3, 10),
            hours: false,
        },

        period2: {
            from: new Date(2025, 3, 12),
            to: new Date(2025, 5, 1),
            hours: false,
        },

    }
});
~~~

:::note

**Related example:** [`customWeeks`를 사용해 캘린더의 모든 날을 휴일로 만드는 예](https://snippet.dhtmlx.com/i0o74zg7)

:::

### Related API
- [work_time](api/config/work_time.md)
- [unsetWorkTime](api/method/unsetworktime.md)
- [isWorkTime](api/method/isworktime.md)

### Related Guides
- [작업 시간 계산](guides/working-time.md)

### Change log
- **customWeeks** 속성은 v7.1에 도입되었습니다;
- 구성 객체의 **hours** 속성 형식은 버전 7.0에서 변경되었습니다.

