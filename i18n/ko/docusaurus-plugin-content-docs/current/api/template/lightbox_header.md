---
sidebar_label: lightbox_header
title: lightbox_header template
description: "라이트박스의 헤더를 지정합니다."
---

# lightbox_header

### Description

@short: 라이트박스의 헤더를 지정합니다.

@signature: lightbox_header: (start_date: Date, end_date: Date, task: Task) =\> string;

### Parameters

- `start_date` - (required) *Date* - 작업이 시작되기로 예정된 날짜   
- `end_date` - (required) *Date* - 작업이 완료되기로 예정된 날짜
- `task` - (required) *Task* - 작업 객체

### Returns
- ` text` - (string) - 간트 차트에 렌더링할 HTML 텍스트

### Example

~~~jsx
gantt.templates.lightbox_header = function(start_date,end_date,task){
    return gantt.templates.task_time(task.start_date, task.end_date, task)  +  "&nbsp;" +
    (gantt.templates.task_text(task.start_date, task.end_date, task) || "").substr(0, 70);
};
~~~

### Related Guides
- [라이트박스의 템플릿](guides/lightbox-templates.md)
