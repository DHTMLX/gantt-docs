---
sidebar_label: tooltip_text
title: tooltip_text template
description: "legt den Text fest, der in Tooltips angezeigt wird"
---

# tooltip_text

### Description

@short: Legt den Text fest, der in Tooltips angezeigt wird

@signature: tooltip_text: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (required) *Date* - das Datum, an dem eine Aufgabe geplant ist zu beginnen
- `end` - (required) *Date* - das Datum, an dem eine Aufgabe geplant ist zu enden
- `task` - (required) *Task* - das Task-Objekt

### Returns
- ` text` - (string | void) - einen HTML-String, der im Gantt-Tooltip angezeigt wird

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
 Diese Vorlage ist Teil der **tooltip**-Erweiterung, daher muss das [tooltip](guides/extensions-list.md#tooltip) Plugin aktiviert sein. Weitere Details finden sich im Artikel ["Tooltips für Gantt-Elemente"](guides/tooltips.md). 
:::

### Related API
- [tooltip_date_format](api/template/tooltip_date_format.md)

### Related Guides
- ["Vorlagen für Tooltips"](guides/tooltip-templates.md)
- ["Tooltips für Gantt-Elemente"](guides/tooltips.md)

