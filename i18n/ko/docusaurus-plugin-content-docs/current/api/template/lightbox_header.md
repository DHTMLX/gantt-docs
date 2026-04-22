---
sidebar_label: lightbox_header
title: lightbox_header 템플릿
description: "라이트박스의 헤더를 지정합니다"
---

# lightbox_header

### Description

@short: 라이트박스의 헤더를 지정합니다

@signature: lightbox_header: (start_date: Date, end_date: Date, task: Task) =\> string;

### Parameters

- `start_date` - (필수) *Date* - 작업이 시작되도록 예약된 날짜
- `end_date` - (필수) *Date* - 작업이 완료될 예정인 날짜
- `task` - (필수) *Task* - 작업의 객체

### Returns
- ` text` - (string) - 간트 차트에서 렌더링하기 위한 HTML 텍스트

### Example

~~~jsx
gantt.templates.lightbox_header = function(start_date,end_date,task){
    return gantt.templates.task_time(task.start_date, task.end_date, task)  +  "&nbsp;" +
    (gantt.templates.task_text(task.start_date, task.end_date, task) || "").substr(0, 70);
};
~~~

### Related Guides
- [Templates of the Lightbox](guides/lightbox-templates.md)