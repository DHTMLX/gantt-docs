---
sidebar_label: isWorkTime
title: isWorkTime method
description: "주어진 날짜가 근무 시간 내에 해당하는지 판단합니다."
---

# isWorkTime

### Description

@short: 주어진 날짜가 근무 시간 내에 해당하는지 판단합니다.

@signature: isWorkTime: (config: Date | object) =\> boolean,

### Parameters

- `config` - (required) *object | Date* -        시간 범위를 설명하는 구성 객체이거나 특정 날짜일 수 있습니다.

### Returns
- ` isWorkTime` - (boolean) - <i>true</i> 주어진 날짜가 근무 시간 내에 있으면; 그렇지 않으면 <i>false</i>

### Example

~~~jsx
//전역 설정에 따라 지정된 날짜가 근무일인지 확인
gantt.isWorkTime({ date: new Date(2023,3,5) });
// 또는
gantt.isWorkTime(new Date(2023,3,5));

//특정 작업에 대해 지정된 날짜가 근무일인지 확인
gantt.isWorkTime({date: new Date(2023,3,5), task: task});
~~~

### Details

:::note

[work_time](api/config/work_time.md) 옵션이 꺼져 있으면, 이 메서드는 항상 `true`를 반환합니다.
 
:::

- task가 제공되지 않으면, 이 메서드는 [전역 근무 시간 캘린더](guides/working-time.md#multipleworktimecalendars)를 참조합니다. <br>
- 이 메서드는 [캘린더 객체](api/other/calendar.md)에서 직접 호출할 수도 있습니다.


차트에 대한 다음과 같은 근무 시간 설정을 고려해보십시오:

- **근무일**: 월요일부터 금요일까지
- **근무 시간**: 오전 6시부터 오후 3시까지

아래와 같이 2023년 4월 3일 월요일을 확인하면 결과는 다음과 같습니다:

~~~js
gantt.isWorkTime({date: new Date(2023,3,3,17,00), unit: "hour"}); 
//->false, 오후 5시부터 6시까지는 근무 시간 외이기 때문입니다.

gantt.isWorkTime({date: new Date(2023,3,3,17,00), unit:  "day"}); 
//-> true, 월요일은 근무일이므로
~~~

## 구성 객체 속성 {#configurationobjectproperties}

구성 객체에는 다음 속성을 포함할 수 있습니다:

- **date** - (*Date*) 확인할 날짜
- **unit** - (string)    선택 사항, 시간 단위를 지정: "minute", "hour", "day", "week", "month", "year"
- **task** - (*object*)    선택 사항, 근무 기간을 결정할 작업 객체

~~~js
if (gantt.isWorkTime({date: date, task: task})){
    alert("worktime of task" + task.text);
}
~~~

### Related API
- [work_time](api/config/work_time.md)
- [setWorkTime](api/method/setworktime.md)
- [getWorkHours](api/method/getworkhours.md)

### Related Guides
- [작업 시간 계산](guides/working-time.md)

