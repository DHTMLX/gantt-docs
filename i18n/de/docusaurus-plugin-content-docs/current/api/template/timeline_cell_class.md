---
sidebar_label: timeline_cell_class
title: timeline_cell_class Vorlage
description: "gibt die CSS-Klasse an, die auf die Zellen des Timeline-Bereichs angewendet wird"
---

# timeline_cell_class

### Description

@short: Gibt die CSS-Klasse an, die auf die Zellen des Timeline-Bereichs angewendet wird

@signature: timeline_cell_class: (item: any, date: Date) =\> string | void;

### Parameters

- `item` - (erforderlich) *Task | object* - entweder das Objekt der Aufgabe oder der Ressource, das der Zeile zugewiesen ist
- `date` - (erforderlich) *Date* - das Datum der Zelle

### Returns
- ` text` - (string | void) - eine CSS-Klasse für das betreffende Element

### Example

~~~jsx
<style>
.weekend{ background: #f4f7f4 !important;}
</style>

gantt.templates.timeline_cell_class = function(task,date){
    if(date.getDay()==0||date.getDay()==6){
        return "weekend";
    }
};
~~~

### Related samples
- [Wochenenden hervorheben](https://docs.dhtmlx.com/gantt/samples/04_customization/06_highlight_weekend.html)

### Details

Beachten Sie, dass Sie beim Verwenden von [Arbeitszeitberechnungen](guides/working-time.md) [isWorkTime](api/method/isworktime.md) anstelle fest codierter Werte verwenden können:

~~~js
gantt.config.work_time = true;

gantt.templates.timeline_cell_class = function(task,date){
    if(!gantt.isWorkTime({task:task, date:date}))
        return "weekend";
};
~~~

### Related API
- [scale_cell_class](api/template/scale_cell_class.md)
- [task_row_class](api/template/task_row_class.md)
- [task_class](api/template/task_class.md)
- [timeline_placeholder](api/config/timeline_placeholder.md)

### Related Guides
- [Vorlagen des Timeline-Bereichs](guides/timeline-templates.md)
- [Hervorheben von Zeitfenstern](guides/highlighting-time-slots.md)
- [Berechnung der Arbeitszeit](guides/working-time.md)