---
sidebar_label: rightside_text
title: rightside_text template
description: "오른쪽 사이드의 태스크 바에 할당될 텍스트를 지정합니다"
---

# rightside_text

### Description

@short: 오른쪽 사이드의 태스크 바에 할당될 텍스트를 지정합니다

@signature: rightside_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - 작업이 시작될 예정인 날짜
- `end` - (required) *Date* - 작업이 완료될 예정인 날짜
- `task` - (required) *Task* - 태스크 객체

### Returns
- ` text` - (string | number | void) - Gantt 차트에 렌더링될 HTML 텍스트

### Example

~~~jsx
gantt.templates.rightside_text = function(start, end, task){
    return "ID: #" + task.id;
};
~~~

### Related samples
-  [사이드 콘텐츠 정의](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)

### Related API
- [leftside_text](api/template/leftside_text.md)

### Related Guides
- [타임라인 영역의 템플릿](guides/timeline-templates.md)
- [작업의 내용 표시](guides/text-block-for-task.md)