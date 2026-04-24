---
sidebar_label: tooltip_text
title: tooltip_text template
description: "툴팁에 표시될 텍스트를 설정합니다"
---

# tooltip_text

### Description

@short: 툴팁의 텍스트를 지정합니다

@signature: tooltip_text: (start: Date, end: Date, task: Task) => string | void;

### Parameters

- `start` - (필수) *Date* - 작업이 시작될 예정 날짜
- `end` - (필수) *Date* - 작업이 종료될 예정 날짜
- `task` - (필수) *Task* - 작업 객체

### Returns
- ` text` - (string | void) - gantt에서 렌더링될 HTML 텍스트

### Example

~~~jsx
gantt.templates.tooltip_text = function(start,end,task){
    return "<b>Task:</b> "+task.text+"<br/><b>Start date:</b> " + 
    gantt.templates.tooltip_date_format(start)+ 
    "<br/><b>End date:</b> "+gantt.templates.tooltip_date_format(end);
};
~~~

### Details

:::note
이 템플릿은 **tooltip** 확장에 정의되어 있으므로 [tooltip](guides/extensions-list.md#tooltip) 플러그인을 활성화해야 합니다. 자세한 내용은 [Tooltips for Gantt Elements](guides/tooltips.md) 문서를 참조하세요.
:::

### Related API
- [tooltip_date_format](api/template/tooltip_date_format.md)

### Related Guides
- [툴팁 템플릿](guides/tooltip-templates.md)
- [Gantt 요소의 툴팁](guides/tooltips.md)

