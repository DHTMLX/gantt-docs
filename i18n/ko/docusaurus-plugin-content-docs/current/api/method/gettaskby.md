---
sidebar_label: getTaskBy
title: getTaskBy method
description: "주어진 기준에 따라 작업을 조회합니다."
---

# getTaskBy

### Description

@short: 주어진 기준에 따라 작업을 조회합니다.

@signature: getTaskBy: (propertyName: string | GanttCallback, propertyValue?: string | number | boolean | any[], types?: any) =\> Array\<Task\>

### Parameters

- `propertyName` - (required) *string | function* -            일치시킬 속성명 또는 필터링 함수
- `propertyValue` - (optional) *string | number | boolean | array* -        속성에 대해 일치시킬 값
- `types` - (optional) *object* - 결과에 포함할 작업 유형을 지정하는 객체

### Returns
- ` tasks` - (Array &lt;Task&gt;) - 조건에 맞는 작업 객체들의 배열

### Example

~~~jsx
// 기본 검색
const userTasks = gantt.getTaskBy("user_id", [5]);

// 필터 함수 사용
let userTasks = gantt.getTaskBy(function(task){
   return task.user_id == 5 || !task.user_id;
});

userTasks = gantt.getTaskBy(task => task.user_id == 5);
~~~

### Related samples
- [Templates of the Resource diagram](https://docs.dhtmlx.com/gantt/samples/11_resources/05_resource_usage_templates.html)

### Details

- 이 메서드는 특정 사용자에게 할당된 작업이나 완료된 작업 등, 속성 값에 따라 작업을 선택할 수 있게 해줍니다.
- `gantt.getTaskBy(propertyName, propertyValue)` 호출 시 느슨한 동등 비교("이중 등호", ==)가 사용됩니다.
- `gantt.getTaskBy(propertyName, propertyValue)`의 결과는 gantt에 의해 캐시될 수 있어, 필터 함수 버전 `gantt.getTaskBy((task: object) => boolean)`보다 더 빠를 수 있습니다.

기본적으로 **gantt.getTaskBy()**는 조건에 맞는 작업(task)과 마일스톤(milestone)만 반환하며, 프로젝트 항목은 제외합니다.

모든 유형의 레코드를 포함하려면 세 번째 매개변수를 사용하세요:

~~~js
gantt.getTaskBy("progress", 1, { task: true, project: true, milestone: true });
~~~

특정 유형의 항목만 얻으려면 세 번째 매개변수에 지정하세요:

~~~js
gantt.getTaskBy("progress", 1, { project: true})
~~~

### Related API
- [getSubtaskDuration](api/method/getsubtaskduration.md)
- [getSubtaskDates](api/method/getsubtaskdates.md)

### Change log
- **types** 매개변수는 v8.0에 도입되었습니다.

