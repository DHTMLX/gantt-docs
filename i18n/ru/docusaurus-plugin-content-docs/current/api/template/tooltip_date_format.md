---
sidebar_label: tooltip_date_format
title: tooltip_date_format template
description: "задает формат дат начала и конца, отображаемых во всплывающей подсказке"
---

# tooltip_date_format

### Description

@short: Указывает формат дат начала и конца, отображаемых во всплывающей подсказке

@signature: tooltip_date_format: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - дату, которую нужно отформатировать

### Returns
- ` text` - (string) - HTML-текст, который будет отображаться в диаграмме Ганта

### Example

~~~jsx
gantt.templates.tooltip_date_format=function (date){
    var formatFunc = gantt.date.date_to_str("%Y-%m-%d %H:%i");
    return formatFunc(date);
};
~~~

### Details

:::note
Этот шаблон определяется в расширении **tooltip**, поэтому необходимо активировать плагин [tooltip](guides/extensions-list.md#tooltip). Подробности см. в статье [Tooltips for Gantt Elements](guides/tooltips.md). 
:::

### Related API
- [tooltip_text](api/template/tooltip_text.md)

### Related Guides
- [Templates of Tooltips](guides/tooltip-templates.md)
- [Tooltips for Gantt Elements](guides/tooltips.md)