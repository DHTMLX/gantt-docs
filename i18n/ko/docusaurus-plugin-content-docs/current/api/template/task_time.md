---
sidebar_label: task_time
title: task_time 템플릿
description: "라이트박스 헤더에 표시될 날짜 기간을 지정합니다"
---

# task_time

### Description

@short: 라이트박스의 헤더에 표시될 날짜 기간을 지정합니다

@signature: task_time: (start: Date, end: Date, task: Task) =\> string;

### Parameters

- `start` - (필수) *Date* - 작업이 시작될 예정인 날짜
- `end` - (필수) *Date* - 작업이 완료될 예정인 날짜
- `task` - (필수) *Task* - 작업 객체

### Returns
- ` text` - (string) - Gantt 차트에서 렌더링될 HTML 텍스트

### Example

~~~jsx
gantt.templates.task_time = function(start,end,task){
    return gantt.templates.task_date(start)+" - "+gantt.templates.task_end_date(end);
};
~~~

### Related API
- [task_date](api/template/task_date.md)
- [task_end_date](api/template/task_end_date.md)

### Related Guides
- [라이트박스의 템플릿](guides/lightbox-templates.md)

