---
sidebar_label: task_row_class
title: task_row_class template
description: "타임라인 영역의 행에 적용되는 CSS 클래스를 지정합니다."
---

# task_row_class

### Description

@short: 타임라인 영역의 행에 적용되는 CSS 클래스를 지정합니다.

@signature: task_row_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - 작업이 시작되는 날짜  
- `end` - (required) *Date* - 작업이 종료되는 날짜
- `task` - (required) *Task* - 작업 객체 자체

### Returns
- ` text` - (string | void) - 처리 중인 항목에 적용할 CSS 클래스

### Example

~~~jsx
gantt.templates.task_row_class = function(start, end, task){
    return "";
};
~~~

### Details

지정된 항목에 대한 CSS 클래스를 제공합니다.

### Related Guides
- [타임라인 영역의 템플릿](guides/timeline-templates.md)
