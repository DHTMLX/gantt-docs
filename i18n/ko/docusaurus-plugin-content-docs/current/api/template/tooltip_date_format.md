---
sidebar_label: tooltip_date_format
title: tooltip_date_format template
description: "툴팁에 시작일과 종료일이 표시되는 방식을 정의합니다."
---

# tooltip_date_format

### Description

@short: 툴팁에 시작일과 종료일이 표시되는 방식을 정의합니다.

@signature: tooltip_date_format: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - 포맷할 날짜입니다.

### Returns
- ` text` - (string) - 간트 툴팁에 표시될 HTML 텍스트입니다.

### Example

~~~jsx
gantt.templates.tooltip_date_format=function (date){
    var formatFunc = gantt.date.date_to_str("%Y-%m-%d %H:%i");
    return formatFunc(date);
};
~~~

### Details

:::note
 이 템플릿은 **tooltip** 확장의 일부이므로, [tooltip](guides/extensions-list.md#tooltip) 플러그인을 반드시 활성화해야 합니다. 자세한 내용은 [Gantt 요소의 툴팁](guides/tooltips.md) 문서를 참고하세요. 
:::

### Related API
- [tooltip_text](api/template/tooltip_text.md)

### Related Guides
- [툴팁 템플릿](guides/tooltip-templates.md)
- [Gantt 요소의 툴팁](guides/tooltips.md)

