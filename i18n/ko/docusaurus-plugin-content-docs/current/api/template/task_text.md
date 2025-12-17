---
sidebar_label: task_text
title: task_text template
description: "작업 바와 라이트박스 헤더에 표시되는 텍스트를 설정합니다."
---

# task_text

### Description

@short: 작업 바와 라이트박스 헤더에 표시되는 텍스트를 설정합니다.

@signature: task_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - 작업이 시작될 예정일  
- `end` - (required) *Date* - 작업이 완료될 예정일
- `task` - (required) *Task* - 작업 객체 자체

### Returns
- ` text` - (string | number | void) - gantt 내부에 표시될 HTML 콘텐츠

### Example

~~~jsx
gantt.templates.task_text=function(start, end, task){
    return task.text;
};
~~~

### Related Guides
- [타임라인 영역의 템플릿](guides/timeline-templates.md)
