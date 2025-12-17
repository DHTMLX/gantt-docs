---
sidebar_label: quick_info_content
title: quick_info_content template
description: "팝업 편집 폼에 표시되는 내용을 정의합니다."
---

# quick_info_content

### Description

@short: 팝업 편집 폼에 표시되는 내용을 정의합니다.

@signature: quick_info_content: (start: Date, end: Date, task: Task) =\> string;

### Parameters

- `start` - (required) *Date* - 작업이 시작되도록 설정된 날짜
- `end` - (required) *Date* - 작업이 완료될 것으로 예상되는 날짜
- `task` - (required) *Task* - 작업 객체 자체

### Returns
- ` text` - (string) - gantt에 표시될 html 콘텐츠

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
 이 템플릿은 **Quick Info** 확장의 일부이므로, 반드시 [quick_info](guides/extensions-list.md#quickinfo) 플러그인을 활성화해야 합니다. 
:::

### Related Guides
- ['Quick Info' 확장(터치 지원)의 템플릿](guides/touch-templates.md)
