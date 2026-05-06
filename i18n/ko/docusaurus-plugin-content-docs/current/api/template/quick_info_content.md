---
sidebar_label: quick_info_content
title: quick_info_content template
description: "팝업 편집 양식의 내용을 지정합니다"
---

# quick_info_content

### Description

@short: 팝업 편집 양식의 내용을 지정합니다

@signature: quick_info_content: (start: Date, end: Date, task: Task) =\> string;

### Parameters

- `start` - (required) *Date* - 작업이 시작될 예정인 날짜
- `end` - (required) *Date* - 태스크가 완료될 예정인 날짜
- `task` - (required) *Task* - 태스크 객체

### Returns
- ` text` - (string) - Gantt 차트에 렌더링될 HTML 텍스트

### Example

~~~jsx
gantt.templates.quick_info_content = function(start, end, task){ 
       return task.details || task.text;
};
~~~

### Related samples
- [QuickInfo extension](https://docs.dhtmlx.com/gantt/samples/02_extensions/01_quickinfo.html)

### Details

:::note
이 템플릿은 **Quick Info** 확장에 정의되어 있으므로 [quick_info](guides/extensions-list.md#quick-info) 플러그인을 활성화해야 합니다.
:::

### Related Guides
- [터치 지원에 따른 'Quick Info' Extension의 템플릿](guides/touch-templates.md)