---
sidebar_label: task_row_class
title: task_row_class template
description: "타임라인 영역의 행에 적용될 CSS 클래스를 지정합니다"
---

# task_row_class

### Description

@short: 타임라인 영역의 행에 적용될 CSS 클래스를 지정합니다

@signature: task_row_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (필수) *Date* - 작업이 시작되기로 예정된 날짜
- `end` - (필수) *Date* - 작업이 완료되도록 예정된 날짜
- `task` - (필수) *Task* - 작업 객체

### Returns
- ` text` - (string | void) - 해당 항목에 대한 CSS 클래스

### Example

~~~jsx
gantt.templates.task_row_class = function(start, end, task){
    return "";
};
~~~

### Details

해당 항목의 CSS 클래스를 반환합니다.

### Related Guides
- [타임라인 영역의 템플릿](guides/timeline-templates.md)
