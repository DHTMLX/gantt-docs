---
sidebar_label: tooltip_text
title: tooltip_text-Vorlage
description: "legt den Text der Tooltips fest"
---

# tooltip_text

### Description

@short: Legt den Text der Tooltips fest

@signature: tooltip_text: (start: Date, end: Date, task: Task) =\> string | void;

### Parameters

- `start` - (erforderlich) *Date* - das Datum, an dem eine Aufgabe voraussichtlich beginnt
- `end` - (erforderlich) *Date* - das Datum, an dem eine Aufgabe voraussichtlich abgeschlossen wird
- `task` - (erforderlich) *Task* - das Aufgabenobjekt

### Returns
- ` text` - (string | void) - ein HTML-Text, der im Gantt gerendert wird

### Example

~~~jsx
gantt.templates.tooltip_text = function(start,end,task){
    return "<b>Aufgabe:</b> "+task.text+"<br/><b>Startdatum:</b> " + 
    gantt.templates.tooltip_date_format(start)+ 
    "<br/><b>Enddatum:</b> "+gantt.templates.tooltip_date_format(end);
};
~~~

### Details

:::note
Dieses Template ist in der **Tooltip-Erweiterung** definiert, daher müssen Sie das [tooltip](guides/extensions-list.md#tooltip) Plugin aktivieren. Lesen Sie die Details im Artikel [Tooltips für Gantt-Elemente](guides/tooltips.md).
:::

### Related API
- [tooltip_date_format](api/template/tooltip_date_format.md)

### Related Guides
- [Tooltips-Vorlagen](guides/tooltip-templates.md)
- [Tooltips für Gantt-Elemente](guides/tooltips.md)