---
sidebar_label: tooltip_date_format
title: tooltip_date_format 템플릿
description: "툴팁에 표시되는 시작일과 종료일의 형식을 지정합니다"
---

# tooltip_date_format

### Description

@short: 툴팁에 표시되는 시작일과 종료일의 형식을 지정합니다

@signature: tooltip_date_format: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - 포맷팅이 필요한 날짜

### Returns
- `text` - (string) - Gantt 차트에 렌더링될 HTML 텍스트

### Example

~~~jsx
gantt.templates.tooltip_date_format=function (date){
    var formatFunc = gantt.date.date_to_str("%Y-%m-%d %H:%i");
    return formatFunc(date);
};
~~~

### Details

:::note
이 템플릿은 **tooltip** 확장에 정의되어 있으므로 [tooltip](guides/extensions-list.md#tooltip) 플러그인을 활성화해야 합니다. 간트 차트 요소용 Tooltips에 대한 자세한 내용은 [Tooltips for Gantt Elements](guides/tooltips.md) 문서를 참조하십시오.
:::

### Related API
- [tooltip_text](api/template/tooltip_text.md)

### Related Guides
- [툴팁 템플릿](guides/tooltip-templates.md)
- [간트 차트 요소용 툴팁](guides/tooltips.md)