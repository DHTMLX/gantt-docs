---
sidebar_label: calculateEndDate
title: calculateEndDate 메서드
description: "작업의 종료일을 계산합니다"
---

# calculateEndDate

### Description

@short: 작업의 종료일을 계산합니다

@signature: calculateEndDate: (config: object, duration: number) => Date

### Parameters

- `config` - (required) *object | Date* - 시간 간격의 구성 객체 또는 태스크의 시작 날짜
- `duration` - (optional) *number* - 태스크의 지속 시간. 첫 번째 매개변수를 start_date로 지정한 경우에만 이 매개변수가 필요합니다

### Returns
- `end_date` - (Date) - 작업이 완료될 예정인 날짜

### Example

~~~jsx
gantt.config.work_time = true;
gantt.init("gantt_here");
 
// 전역 근무 시간 설정을 사용하여 종료 날짜를 계산
gantt.calculateEndDate({start_date: new Date(2013,02,15), duration: 48});
// 또는
gantt.calculateEndDate(new Date(2013,02,15), 48);

// 특정 작업 캘린더에 대한 종료 날짜를 계산
gantt.calculateEndDate({start_date: new Date(2013,02,15), duration: 48, task:task});
// 또는 간단한 형태:
// 현재 태스크에 할당된 캘린더를 사용합니다, task.start_date 및 task.duration
gantt.calculateEndDate(task);
~~~



### Details

:::note

[work_time](api/config/work_time.md) 옵션이 켜져 있을 때, 이 메서드는 duration을 작업 시간으로 처리합니다.
 
:::

- 작업이 제공되지 않으면, 메서드는 기본적으로 [전역 작업 시간 캘린더](guides/working-time.md#multipleworktimecalendars)를 사용합니다. <br>
- 이 메서드는 또한 [캘린더 객체](api/other/calendar.md)에 직접 적용할 수도 있습니다.


**calculateEndDate**를 사용하여 시작 날짜를 계산할 수도 있습니다:

~~~js
// 시작 날짜를 계산합니다:
task.start_date = gantt.calculateEndDate({
    start_date: task.end_date,
    duration: -task.duration
});
~~~

## 구성 객체 속성 {#configurationobjectproperties}

구성 객체는 다음 속성을 포함할 수 있습니다:

- **start_date** - (*Date*) 작업이 시작될 예정인 날짜
- **duration** - (*number*)    태스크의 지속 시간
* **unit** - (*string*)    선택적, 지속 시간의 시간 단위: "minute", "hour", "day", "week", "month", "year"
* **task** - (*object*)    선택적, 지속 시간을 계산할 태스크의 객체

### Related API
- [calculateDuration](api/method/calculateduration.md)
- [calculateTaskLevel](api/method/calculatetasklevel.md)