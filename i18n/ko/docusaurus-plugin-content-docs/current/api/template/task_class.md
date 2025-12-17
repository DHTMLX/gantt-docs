---
sidebar_label: task_class
title: task_class template
description: "작업 바에 적용되는 CSS 클래스를 정의합니다"
---

# task_class

### Description

@short: 작업 바에 적용되는 CSS 클래스를 정의합니다

@signature: task_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - 작업이 시작될 예정인 날짜  
- `end` - (required) *Date* - 작업이 완료될 예정인 날짜
- `task` - (required) *Task* - 작업 객체 자체

### Returns
- ` text` - (string | void) - 항목에 할당할 CSS 클래스

### Example

~~~jsx
gantt.templates.task_class = function(start, end, task){return "";};
~~~

### Related Guides
- [타임라인 영역의 템플릿](guides/timeline-templates.md)
