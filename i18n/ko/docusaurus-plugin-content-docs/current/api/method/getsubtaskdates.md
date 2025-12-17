---
sidebar_label: getSubtaskDates
title: getSubtaskDates method
description: "프로젝트나 다른 작업에 중첩된 작업들의 시작일과 종료일을 합산하여 계산합니다."
---

# getSubtaskDates

### Description

@short: 프로젝트나 다른 작업에 중첩된 작업들의 시작일과 종료일을 합산하여 계산합니다.

@signature: getSubtaskDates: (task_id?: string | number) =\> any

### Parameters

- `task_id` - (optional) *string | number* -        작업의 ID, 지정하지 않으면 [root_id](api/config/root_id.md)가 사용됩니다.

### Returns
- ` dates` - (object) - <b>start_date</b>와 <b>end_date</b> 속성을 포함하는 객체를 반환합니다.

### Example

~~~jsx
// 전체 프로젝트의 기간
let dates = gantt.getSubtaskDates();
const dateToStr = gantt.templates.task_date;
    
console.log(`${dateToStr(dates.start_date)} - ${dateToStr(dates.end_date)}`);

// 하위 프로젝트의 기간
dates = gantt.getSubtaskDates(1);
    
console.log(`${dateToStr(dates.start_date)} - ${dateToStr(dates.end_date)}`);
~~~

### Details

이 메서드는 가장 이른 하위 작업의 시작일과 가장 늦은 하위 작업의 종료일을 보여주는 객체를 제공합니다.

반환되는 객체는 다음과 같습니다:

~~~js
{
  start_date: Date|null,
  end_date: Date|null
}
~~~

Gantt 차트에 예정된 작업이 포함되어 있으면 두 속성 모두 날짜 값을 포함합니다. 차트가 비어 있거나 예정되지 않은 작업만 있을 경우 두 속성 모두 `null`입니다.

### Related API
- [getSubtaskDuration](api/method/getsubtaskduration.md)
- [getTaskBy](api/method/gettaskby.md)

