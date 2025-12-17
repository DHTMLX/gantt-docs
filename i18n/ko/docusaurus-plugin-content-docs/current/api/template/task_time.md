---
sidebar_label: task_time
title: task_time template
description: "라이트박스 헤더에 표시되는 날짜 범위를 정의합니다"
---

# task_time

### Description

@short: 라이트박스 헤더에 표시되는 날짜 범위를 정의합니다

@signature: task_time: (start: Date, end: Date, task: Task) =\> string;

### Parameters

- `start` - (required) *Date* - 작업이 시작되는 날짜  
- `end` - (required) *Date* - 작업이 완료될 것으로 예상되는 날짜
- `task` - (required) *Task* - 작업 객체 자체

### Returns
- ` text` - (string) - gantt에 표시될 HTML 콘텐츠

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

