---
sidebar_label: isWorkTime
title: isWorkTime method
description: "지정된 날짜가 근무 시간인지 여부를 확인합니다"
---

# isWorkTime

### Description

@short: 지정된 날짜가 근무 시간인지 여부를 확인합니다

@signature: isWorkTime: Calendar['isWorkTime']

### Parameters

- `config` - (required) *object | Date* -        타임 스팬의 구성 객체 또는 특정 날짜

### Returns
- ` isWorkTime` - (boolean) - <i>true</i>, 지정된 날짜가 근무 시간인 경우. 그렇지 않으면 <i>false</i>

### Example

~~~jsx
//전역 설정에서 지정된 날짜가 근무일인지 확인합니다
gantt.isWorkTime({ date: new Date(2023,3,5) });
// 또는
gantt.isWorkTime(new Date(2023,3,5));

//특정 작업에 대해 지정된 날짜가 근무일인지 확인합니다
gantt.isWorkTime({date: new Date(2023,3,5), task: task});
~~~

### Details

:::note
If the [work_time](api/config/work_time.md) option is disabled, the method always returns `true`. 
::: 

- 태스크가 지정되지 않은 경우 메서드는 [global work time calendar](guides/working-time.md#multipleworktimecalendars)를 사용합니다. 
- 또한, 이 메서드는 [calendar object](api/other/calendar.md)에서 직접 호출할 수 있습니다.

다음과 같은 차트의 근무 시간을 설정했다고 가정해 봅시다:

- **근무일**: 월요일 - 금요일
- **근무 시간**: 6:00 - 15:00

그렇다면, 2023년 4월 3일 월요일을 아래와 같이 확인하면:

~~~js
gantt.isWorkTime({date: new Date(2023,3,3,17,00), unit: "hour"}); 
//->false, 17:00-18:00은 근무 시간이 아닙니다

gantt.isWorkTime({date: new Date(2023,3,3,17,00), unit:  "day"}); 
//-> true, 월요일은 근무일이므로
~~~

## Configuration object properties

구성 객체에는 다음 속성들이 포함될 수 있습니다:

- **date** - (*Date*) 확인할 날짜
- * **unit** - (string)    선택적, 시간 단위: "minute", "hour", "day", "week", "month", "year"
- * **task** - (*object*)    선택적, 기간을 계산할 작업의 객체

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
- [Work Time Calculation](guides/working-time.md)