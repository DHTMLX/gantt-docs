---
sidebar_label: quick_info_title
title: quick_info_title 템플릿
description: "팝업 편집 양식의 제목을 지정합니다"
---

# quick_info_title

### Description

@short: 팝업 편집 양식의 제목을 지정합니다

@signature: quick_info_title: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (필수) *Date* - 작업이 시작될 예정인 날짜
- `end` - (필수) *Date* - 작업이 완료될 예정인 날짜
- `task` - (필수) *Task* - 작업 객체

### Returns
- `text` - (string | number | void) - Gantt 차트에 렌더링될 HTML 텍스트

### Example

~~~jsx
gantt.templates.quick_info_title = function(start, end, task){ 
       return ev.text.substr(0,50); 
};
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
이 템플릿은 **Quick Info** 확장에서 정의되며, [quick_info](guides/extensions-list.md#quick-info) 플러그인을 활성화해야 합니다.
:::

### Related Guides
- [Templates of the 'Quick Info' Extension (Touch Support)](guides/touch-templates.md)