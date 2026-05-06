---
sidebar_label: quick_info_date
title: quick_info_date 템플릿
description: "팝업 편집 양식의 날짜를 지정합니다"
---

# quick_info_date

### Description

@short: 팝업 편집 양식의 날짜를 지정합니다

@signature: quick_info_date: (start: Date, end: Date, task: Task) =\> string;

### Parameters

- `start` - (필수) *Date* - 작업이 시작되도록 예정된 날짜
- `end` - (필수) *Date* - 작업이 완료되도록 예정된 날짜
- `task` - (필수) *Task* - 작업 객체

### Returns
- ` text` - (string) - Gantt에 렌더링될 HTML 텍스트

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
이 템플릿은 **Quick Info** 확장 기능에 정의되어 있으므로 [quick_info](guides/extensions-list.md#quick-info) 플러그인을 활성화해야 합니다.
:::

### Related Guides
- [퀵 인포 확장 템플릿 (터치 지원)](guides/touch-templates.md)