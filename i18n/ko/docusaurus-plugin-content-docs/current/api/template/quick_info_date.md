---
sidebar_label: quick_info_date
title: quick_info_date template
description: "팝업 편집 폼에 표시되는 날짜를 설정합니다"
---

# quick_info_date

### Description

@short: 팝업 편집 폼에 표시되는 날짜를 설정합니다

@signature: quick_info_date: (start: Date, end: Date, task: Task) =\> string;

### Parameters

- `start` - (required) *Date* - 작업이 시작될 예정인 날짜
- `end` - (required) *Date* - 작업이 완료될 예정인 날짜
- `task` - (required) *Task* - 작업 객체

### Returns
- ` text` - (string) - gantt에 표시되는 html 콘텐츠

### Example

~~~jsx
gantt.templates.quick_info_date = function(start, end, task){
       return gantt.templates.task_time(start, end, task);
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
