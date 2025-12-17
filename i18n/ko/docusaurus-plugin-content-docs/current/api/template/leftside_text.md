---
sidebar_label: leftside_text
title: leftside_text template
description: "작업 막대의 왼쪽에 표시되는 텍스트를 정의합니다."
---

# leftside_text

### Description

@short: 작업 막대의 왼쪽에 표시되는 텍스트를 정의합니다.

@signature: leftside_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - 작업이 시작될 예정인 날짜
- `end` - (required) *Date* - 작업이 완료될 것으로 예상되는 날짜
- `task` - (required) *Task* - 작업 객체 자체

### Returns
- ` text` - (string | number | void) - 간트 차트에 표시될 HTML 텍스트

### Example

~~~jsx
const formatter = gantt.ext.formatters.durationFormatter({
    format: ["day"]
});

gantt.templates.leftside_text = function(start, end, task){
    return formatter.format(task.duration);
};
~~~

### Related samples
- [Define side content](https://docs.dhtmlx.com/gantt/samples/04_customization/01_outer_content.html)

### Related API
- [rightside_text](api/template/rightside_text.md)

### Related Guides
- [타임라인 영역의 템플릿](guides/timeline-templates.md)
- [작업 내용 표시](guides/text-block-for-task.md)
- [Formatters Extension](guides/formatters-ext.md#durationformatter)

