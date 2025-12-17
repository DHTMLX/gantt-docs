---
sidebar_label: quick_info_title
title: quick_info_title template
description: "팝업 편집 폼의 제목을 설정합니다"
---

# quick_info_title

### Description

@short: 팝업 편집 폼의 제목을 설정합니다

@signature: quick_info_title: (start: Date, end: Date, task: Task) =\> string | number | void;

### Parameters

- `start` - (required) *Date* - 작업이 시작될 예정인 날짜
- `end` - (required) *Date* - 작업이 완료될 것으로 예상되는 날짜
- `task` - (required) *Task* - 작업 객체 자체

### Returns
- ` text` - (string | number | void) - gantt에 표시될 HTML 문자열

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
 이 템플릿은 **Quick Info** 확장의 일부이므로, [quick_info](guides/extensions-list.md#quickinfo) 플러그인이 활성화되어 있는지 확인하세요. 
:::

### Related Guides
- ['Quick Info' 확장(터치 지원)의 템플릿](guides/touch-templates.md)
