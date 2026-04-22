---
sidebar_label: getSubtaskDates
title: getSubtaskDates 메서드
description: "프로젝트나 다른 작업에 중첩된 작업들의 시작일과 종료일을 합쳐 계산합니다"
---

# getSubtaskDates

### Description

@short: 프로젝트나 다른 작업에 중첩된 작업들의 시작일과 종료일을 합쳐 계산합니다

@signature: getSubtaskDates: (task_id?: string | number) =\> any

### Parameters

- `task_id` - (optional) *string | number* - 작업의 ID이며, 지정하지 않으면 [root_id](api/config/root_id.md)가 사용됩니다

### Returns
- ` dates` - (object) - start_date 및 end_date 속성을 포함하는 객체

### Example

~~~jsx
// 전체 프로젝트 기간
let dates = gantt.getSubtaskDates();
const dateToStr = gantt.templates.task_date;
    
console.log(`${dateToStr(dates.start_date)} - ${dateToStr(dates.end_date)}`);

// 서브프로젝트 기간
dates = gantt.getSubtaskDates(1);
    
console.log(`${dateToStr(dates.start_date)} - ${dateToStr(dates.end_date)}`);
~~~

### Details

메서드는 가장 이른 서브태스크의 시작 날짜와 가장 늦은 서브태스크의 종료 날짜를 포함하는 객체를 반환합니다.

반환 객체의 형식은 다음과 같습니다:

~~~js
{
  start_date: Date|null,
  end_date: Date|null
}
~~~

Gantt 차트에 일정이 잡힌 작업이 하나라도 있으면 두 속성은 모두 날짜 값을 가지게 됩니다. 차트가 비어 있거나 일정이 없는 작업만 포함하는 경우 두 속성은 모두 `null` 값을 가집니다.

### Related API
- [getSubtaskDuration](api/method/getsubtaskduration.md)
- [getTaskBy](api/method/gettaskby.md)