---
sidebar_label: calculateEndDate
title: calculateEndDate method
description: "작업의 종료 날짜를 계산합니다"
---

# calculateEndDate

### Description

@short: 작업의 종료 날짜를 계산합니다

@signature: calculateEndDate: (config: Date | object, duration?: number) =\> Date

### Parameters

- `config` - (required) *object | Date* -        시간 범위를 설명하는 [구성 객체](#configurationobjectproperties)이거나 단순히 작업의 시작 날짜일 수 있습니다.
- `duration` - (optional) *number* - 선택 사항, 작업의 길이입니다. 첫 번째 매개변수가 단순한 <i>start_date</i>일 때 필요합니다.

### Returns
- ` end_date` - (Date) - 작업이 완료될 것으로 예상되는 날짜입니다.

### Example

~~~jsx
gantt.config.work_time = true;
gantt.init("gantt_here");
 
// 전역 작업 시간 설정을 기준으로 종료 날짜를 찾습니다
gantt.calculateEndDate({start_date: new Date(2013,02,15), duration: 48});
// 또는
gantt.calculateEndDate(new Date(2013,02,15), 48);

// 특정 작업 캘린더에 대한 종료 날짜를 가져옵니다
gantt.calculateEndDate({start_date: new Date(2013,02,15), duration: 48, task:task});
// 또는 단축형:
// 작업에 할당된 캘린더와 작업의 시작 날짜 및 기간을 사용합니다
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
// 시작 날짜를 찾기:
task.start_date = gantt.calculateEndDate({
    start_date: task.end_date,
    duration: -task.duration
});
~~~

## 구성 객체 속성 {#configurationobjectproperties}
 
구성 객체는 다음 속성을 포함할 수 있습니다:

- **start_date** - (*Date*) 작업이 계획된 시작 날짜
- **duration** - (*number*) 작업 기간
* **unit** - (*string*) 선택 사항, duration의 시간 단위: "minute", "hour", "day", "week", "month", "year"
* **task** - (*object*) 선택 사항, 기간을 계산할 작업 객체

### Related API
- [calculateDuration](api/method/calculateduration.md)
- [calculateTaskLevel](api/method/calculatetasklevel.md)

