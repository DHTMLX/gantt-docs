---
sidebar_label: tooltip_date_format
title: tooltip_date_format template
description: "определяет, как отображаются даты начала и окончания в tooltip"
---

# tooltip_date_format

### Description

@short: Определяет, как отображаются даты начала и окончания в tooltip

@signature: tooltip_date_format: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - дата, которую нужно отформатировать

### Returns
- ` text` - (string) - html текст, отображаемый в tooltip диаграммы Ганта

### Example

~~~jsx
gantt.templates.tooltip_date_format=function (date){
    var formatFunc = gantt.date.date_to_str("%Y-%m-%d %H:%i");
    return formatFunc(date);
};
~~~

### Details

:::note
 Этот шаблон является частью расширения **tooltip**, поэтому убедитесь, что плагин [tooltip](guides/extensions-list.md#tooltip) включен. Дополнительную информацию можно найти в статье [Тултипы для элементов Gantt](guides/tooltips.md). 
:::

### Related API
- [tooltip_text](api/template/tooltip_text.md)

### Related Guides
- [Шаблоны тултипов](guides/tooltip-templates.md)
- [Тултипы для элементов Gantt](guides/tooltips.md)

