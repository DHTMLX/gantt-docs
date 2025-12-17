---
sidebar_label: progress_text
title: progress_text template
description: "작업 바의 완료된 부분에 표시되는 텍스트를 정의합니다"
---

# progress_text

### Description

@short: 작업 바의 완료된 부분에 표시되는 텍스트를 정의합니다

@signature: progress_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - 작업이 시작될 예정인 날짜  
- `end` - (required) *Date* - 작업이 완료될 것으로 예상되는 날짜
- `task` - (required) *Task* - 작업 객체

### Returns
- ` text` - (string | number | void) - gantt 내부에 표시될 HTML 텍스트

### Example

~~~jsx
gantt.templates.progress_text=function(start, end, task){return "";};
~~~

### Related samples
- [Text in the Progress bar](https://docs.dhtmlx.com/gantt/samples/04_customization/07_progress_text.html)

### Related Guides
- [타임라인 영역의 템플릿](guides/timeline-templates.md)
