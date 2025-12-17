---
sidebar_label: calculateDuration
title: calculateDuration method
description: "작업의 길이를 계산합니다"
---

# calculateDuration

### Description

@short: 작업의 길이를 계산합니다

@signature: calculateDuration: (config: Date | object, end?: Date) =\> number

### Parameters

- `config` - (required) *object | Date* -        시간 범위를 설명하는 [구성 객체](#configurationobjectproperties)이거나 단순히 작업의 시작 날짜일 수 있습니다
- `end_date` - (optional) *Date* - 선택 사항, 작업의 종료 날짜입니다. 첫 번째 매개변수가 단순히 <i>start_date</i>인 경우 필요합니다.

### Returns
- ` duration` - (number) - [duration_unit](api/config/duration_unit.md) 옵션으로 설정된 단위로 작업의 길이를 반환합니다

### Example

~~~jsx
gantt.config.work_time = true;
gantt.init("gantt_here");

// 두 날짜 사이의 작업 시간 길이 계산
// (여러 작업 캘린더가 있는 작업에 유용)
gantt.calculateDuration({
    start_date: new Date(2013,02,15), 
    end_date: new Date(2013,02,25)
    /*,task: task*/
});

// 또는 
gantt.calculateDuration(task);

// 또는 
gantt.calculateDuration(new Date(2013,02,15), new Date(2013,02,25)); //->6
~~~

### Details

:::note

[work_time](api/config/work_time.md) 옵션이 활성화된 경우, 이 메서드는 작업 시간을 기준으로 작업의 길이를 계산합니다.
 
:::


- 작업이 주어지지 않으면 기본적으로 [글로벌 작업 시간 캘린더](guides/working-time.md#multipleworktimecalendars)를 사용합니다. <br>
- 이 메서드는 [캘린더 객체](api/other/calendar.md)에서 직접 사용할 수도 있습니다.

## 구성 객체 속성 {#configurationobjectproperties}

구성 객체는 다음 속성을 포함할 수 있습니다:

- **start_date** - (*Date*) 작업이 시작될 예정인 날짜
- **end_date** - (*Date*) 작업이 종료될 예정인 날짜
* **task** - (*object*)    선택 사항, 지속 시간을 계산할 작업 객체

### Related API
- [calculateEndDate](api/method/calculateenddate.md)
- [calculateTaskLevel](api/method/calculatetasklevel.md)

### Related Guides
- - [작업 시간 계산](guides/working-time.md)

