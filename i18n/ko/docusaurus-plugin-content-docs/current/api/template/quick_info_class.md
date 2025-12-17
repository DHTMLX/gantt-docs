---
sidebar_label: quick_info_class
title: quick_info_class template
description: "팝업 편집 폼에 적용되는 CSS 클래스를 정의합니다."
---

# quick_info_class

### Description

@short: 팝업 편집 폼에 적용되는 CSS 클래스를 정의합니다.

@signature: quick_info_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - 스케줄된 작업의 시작 날짜
- `end` - (required) *Date* - 작업이 완료되어야 하는 종료 날짜
- `task` - (required) *Task* - 작업 객체 자체

### Returns
- ` text` - (string | void) - Quick Info 팝업에 사용될 CSS 클래스 이름

### Example

~~~jsx
gantt.templates.quick_info_class = function(start, end, task){ 
    return task.type == gantt.config.types.milestone ? "milestone_popup" : "";
};
~~~

### Details

:::note
 이 템플릿은 **Quick Info** 확장의 일부이므로, 먼저 [quick_info](guides/extensions-list.md#quickinfo) 플러그인을 활성화해야 합니다. 
:::

### Related Guides
- ['Quick Info' 확장(터치 지원)의 템플릿](guides/touch-templates.md)
