---
sidebar_label: timeline_cell_class
title: timeline_cell_class template
description: "definiert die CSS-Klasse, die auf die Zellen im Timeline-Bereich angewendet wird"
---

# timeline_cell_class

### Description

@short: Definiert die CSS-Klasse, die auf die Zellen im Timeline-Bereich angewendet wird

@signature: timeline_cell_class: (item: any, date: Date) =\> string | void;

### Parameters

- `item` - (required) *Task* - | object        die Aufgabe oder das Ressourcenobjekt, das mit der Zeile verknüpft ist
- `date` - (required) *Date* - das spezifische Datum der Zelle

### Returns
- ` text` - (string | void) - einen CSS-Klassennamen für das gegebene Element

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
- [Highlighting weekends](https://docs.dhtmlx.com/gantt/samples/04_customization/06_highlight_weekend.html)

### Details

Beim Arbeiten mit [work time calculations](guides/working-time.md) ist es besser, [isWorkTime](api/method/isworktime.md) anstelle von festen Werten zu verwenden:

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
- ["Vorlagen für den Timeline-Bereich"](guides/timeline-templates.md)
- ["Hervorheben von Zeitfenstern"](guides/highlighting-time-slots.md)
- ["Arbeitszeitberechnung"](guides/working-time.md)

