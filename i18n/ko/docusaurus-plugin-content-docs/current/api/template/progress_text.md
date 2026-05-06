---
sidebar_label: progress_text  
title: progress_text 템플릿  
description: "작업 바의 완료 부분에 표시될 텍스트를 지정합니다."  
---  

# progress_text

### Description

@short: 작업 바의 완료 부분에 표시될 텍스트를 지정합니다

@signature: progress_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (필수) *Date* - 작업이 시작될 예정인 날짜
- `end` - (필수) *Date* - 작업이 완료될 예정인 날짜
- `task` - (필수) *Task* - 작업 객체

### Returns
- ` text` - (string | number | void) - Gantt 차트에 렌더링될 HTML 텍스트

### Example

~~~jsx
gantt.templates.progress_text=function(start, end, task){return "";};
~~~

### Related samples
- [Text in the Progress bar](https://docs.dhtmlx.com/gantt/samples/04_customization/07_progress_text.html)

### Related Guides
- [타임라인 영역의 템플릿](guides/timeline-templates.md)
