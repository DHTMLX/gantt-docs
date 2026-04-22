---
sidebar_label: leftside_text
title: leftside_text 템플릿
description: "왼쪽 사이드에 있는 작업 바에 할당될 텍스트를 지정합니다"
---

# leftside_text

### Description

@short: 왼쪽 사이드의 작업 바에 할당될 텍스트를 지정합니다

@signature: leftside_text: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (필수) *Date* - 작업이 시작될 예정인 날짜
- `end` - (필수) *Date* - 작업이 완료될 예정인 날짜
- `task` - (필수) *Task* - 작업 객체

### Returns
- ` text` - (string | number | void) - Gantt 차트에서 렌더링될 HTML 텍스트

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
- [Templates of the Timeline Area](guides/timeline-templates.md)
- [Displaying Contents of Tasks](guides/text-block-for-task.md)
- [Formatters Extension](guides/formatters-ext.md#durationformatter)