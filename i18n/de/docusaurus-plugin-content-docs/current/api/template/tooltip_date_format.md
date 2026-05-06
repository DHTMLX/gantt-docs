---
sidebar_label: tooltip_date_format
title: tooltip_date_format Vorlage
description: "definiert das Format der Start- und Enddaten, die im Tooltip angezeigt werden"
---

# tooltip_date_format

### Description

@short: Definiert, wie Start- und Enddaten im Tooltip angezeigt werden

@signature: tooltip_date_format: (date: Date) =\> string;

### Parameters

- `date` - (erforderlich) *Date* - das Datum, das formatiert werden muss

### Returns
- ` text` - (string) - HTML-Text, der im Gantt gerendert wird

### Example

~~~jsx
gantt.templates.tooltip_date_format=function (date){
    var formatFunc = gantt.date.date_to_str("%Y-%m-%d %H:%i");
    return formatFunc(date);
};
~~~

### Details

:::note
Diese Vorlage ist in der **Tooltip-Erweiterung** definiert, daher müssen Sie das [tooltip](guides/extensions-list.md#tooltip) Plugin aktivieren. Lesen Sie die Details im Artikel [Tooltips for Gantt Elements](guides/tooltips.md). 
:::

### Related API
- [tooltip_text](api/template/tooltip_text.md)

### Related Guides
- [Tooltips-Vorlagen](guides/tooltip-templates.md)
- [Tooltips for Gantt Elements](guides/tooltips.md)