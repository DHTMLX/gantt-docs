---
sidebar_label: tooltip_date_format
title: tooltip_date_format template
description: "definiert, wie Start- und Enddaten im Tooltip angezeigt werden"
---

# tooltip_date_format

### Description

@short: Definiert, wie Start- und Enddaten im Tooltip angezeigt werden

@signature: tooltip_date_format: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - das zu formatierende Datum

### Returns
- ` text` - (string) - html-Text, der im Gantt-Tooltip angezeigt wird

### Example

~~~jsx
gantt.templates.tooltip_date_format=function (date){
    var formatFunc = gantt.date.date_to_str("%Y-%m-%d %H:%i");
    return formatFunc(date);
};
~~~

### Details

:::note
 Diese Vorlage ist Teil der **tooltip**-Extension. Stellen Sie daher sicher, dass das [tooltip](guides/extensions-list.md#tooltip) Plugin aktiviert ist. Weitere Informationen finden Sie im Artikel ["Tooltips für Gantt-Elemente"](guides/tooltips.md). 
:::

### Related API
- [tooltip_text](api/template/tooltip_text.md)

### Related Guides
- ["Vorlagen für Tooltips"](guides/tooltip-templates.md)
- ["Tooltips für Gantt-Elemente"](guides/tooltips.md)

