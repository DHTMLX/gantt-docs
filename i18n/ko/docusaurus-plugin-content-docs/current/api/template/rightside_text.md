---
sidebar_label: rightside_text
title: rightside_text template
description: "작업 바 오른쪽에 표시되는 텍스트를 정의합니다."
---

# rightside_text

### Description

@short: 작업 바 오른쪽에 표시되는 텍스트를 정의합니다.

@signature: rightside_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - 작업이 시작되도록 설정된 날짜
- `end` - (required) *Date* - 작업이 완료될 예정인 날짜
- `task` - (required) *Task* - 작업 객체 자체

### Returns
- ` text` - (string | number | void) - gantt에 표시될 HTML 문자열

### Example

~~~jsx
gantt.templates.rightside_text = function(start, end, task){
    return "ID: #" + task.id;
};
~~~

### Related samples
- [Define side content](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)

### Related API
- [leftside_text](api/template/leftside_text.md)

### Related Guides
- [타임라인 영역의 템플릿](guides/timeline-templates.md)
- [작업 내용 표시](guides/text-block-for-task.md)

