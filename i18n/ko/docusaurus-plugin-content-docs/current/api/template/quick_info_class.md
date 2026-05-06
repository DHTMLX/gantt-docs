---
sidebar_label: quick_info_class
title: quick_info_class 템플릿
description: "팝업 편집 양식에 적용될 CSS 클래스를 지정합니다"
---

# quick_info_class

### Description

@short: 팝업 편집 양식에 적용될 CSS 클래스 지정

@signature: quick_info_class: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - 작업이 시작될 예정인 날짜
- `end` - (required) *Date* - 작업이 완료될 예정인 날짜
- `task` - (required) *Task* - 작업 객체

### Returns
- ` text` - (string | void) - Quick Info 팝업에 적용될 클래스 이름

### Example

~~~jsx
gantt.templates.quick_info_class = function(start, end, task){ 
    return task.type == gantt.config.types.milestone ? "milestone_popup" : "";
};
~~~

### Details

:::note
이 템플릿은 **Quick Info** 확장 기능에 정의되어 있으므로 [quick_info](guides/extensions-list.md#quick-info) 플러그인을 활성화해야 합니다.
:::

### Related Guides
- [Quick Info 확장 템플릿 (터치 지원)](guides/touch-templates.md)