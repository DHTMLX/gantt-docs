---
sidebar_label: calculateDuration
title: calculateDuration 메서드
description: "작업의 지속 시간을 계산합니다"
---

# calculateDuration

### Description

@short: 작업의 지속 시간을 계산합니다

@signature: calculateDuration: (config: object, end_date: Date) =\> number

### Parameters

- `config` - (필수) *object | Date* -        타임 스팬의 <a href="#configuration-object-properties">configuration object</a> 또는 작업의 시작 날짜에 해당
- `end_date` - (선택) *Date* -  작업의 종료 날짜. 첫 번째 매개 변수가 start_date로 지정된 경우 이 매개 변수가 필요합니다.

### Returns
- ` duration` - (number) -  작업의 지속 시간은 [duration_unit](api/config/duration_unit.md) 옵션으로 지정된 단위로 표시됩니다

### Example

~~~jsx
gantt.config.work_time = true;
gantt.init("gantt_here");

// 지정된 날짜 사이의 근무 시간 지속 시간 계산
// (여러 개의 작업 캘린더가 사용되는 경우 특정 작업에 대해)
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
work_time 옵션이 활성화되면, 이 메서드는 작업의 지속 시간을 근무 시간으로 계산합니다.
:::


- 매개변수로 task가 지정되지 않으면 전역 근무 시간 캘린더를 사용합니다. 
- 또한 이 메서드는 [calendar object](api/other/calendar.md)에 대해 직접 호출할 수 있습니다.

## Configuration object properties

구성 객체에는 다음 속성이 포함될 수 있습니다:

- **start_date** - (*Date*)  작업이 시작되도록 예정된 날짜
- **end_date** - (*Date*)  작업이 완료되도록 예정된 날짜
* **task** - (*object*)    선택 사항, 지속 시간을 계산할 작업의 객체

### Related API
- [calculateEndDate](api/method/calculateenddate.md)
- [calculateTaskLevel](api/method/calculatetasklevel.md)

### Related Guides
- [작업 시간 계산](guides/working-time.md)

