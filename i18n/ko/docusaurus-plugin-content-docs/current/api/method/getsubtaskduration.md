---
sidebar_label: getSubtaskDuration
title: getSubtaskDuration method
description: "프로젝트나 다른 작업 내에 중첩된 작업들의 총 지속 시간을 계산합니다."
---

# getSubtaskDuration

### Description

@short: 프로젝트나 다른 작업 내에 중첩된 작업들의 총 지속 시간을 계산합니다.

@signature: getSubtaskDuration: (task_id?: string | number) =\> number

### Parameters

- `task_id` - (optional) *string | number* -        작업 ID; 생략할 경우 기본값으로 [root_id](api/config/root_id.md)가 사용됩니다.

### Returns
- ` duration` - (number) - 중첩된 작업들의 총 지속 시간

### Example

~~~jsx
const formatter = gantt.ext.formatters.durationFormatter();
//전체 프로젝트의 duration
let duration = gantt.getSubtaskDuration();
    
console.log(formatter.format(duration));

//하위 프로젝트의 duration
duration = gantt.getSubtaskDates(1);
    
console.log(formatter.format(duration));
~~~

### Details

이 메서드는 프로젝트나 다른 작업 내에 중첩된 모든 작업들의 총 지속 시간을 계산합니다.

[project type](api/config/types.md) 작업은 이 총합에서 제외된다는 점에 유의하세요.

반환되는 값은 구성에서 정의된 [duration units](api/config/duration_unit.md) 단위로 제공됩니다.

### Related API
- [getSubtaskDates](api/method/getsubtaskdates.md)
- [getTaskBy](api/method/gettaskby.md)

### Related Guides
- [Formatters Extension](guides/formatters-ext.md#durationformatter)

