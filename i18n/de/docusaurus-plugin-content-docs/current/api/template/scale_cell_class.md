---
sidebar_label: scale_cell_class
title: scale_cell_class template
description: "Definiert die CSS-Klasse, die den Zellen im Zeitachsenbereich der Zeitskala zugewiesen wird"
---

# scale_cell_class

### Description

@short: Definiert die CSS-Klasse, die den Zellen im Zeitachsenbereich der Zeitskala zugewiesen wird

@signature: scale_cell_class: (date: Date) =\> string | void;

### Parameters

- `date` - (required) *Date* - Das spezifische Datum, das von einer Zelle dargestellt wird

### Returns
- ` text` - (string | void) - Eine CSS-Klasse, die auf das entsprechende Element angewendet wird

### Example

~~~jsx
<style>
.weekend{ background: #f4f7f4 !important;}
</style>
~~~
~~~js
gantt.templates.scale_cell_class = function(date){
    if(date.getDay()==0||date.getDay()==6){
        return "weekend";
    }
};
~~~

### Related samples
- [Highlighting weekends](https://docs.dhtmlx.com/gantt/samples/04_customization/06_highlight_weekend.html)

### Details

Beim Einsatz von [work time calculations](guides/working-time.md) ist es möglich, statt fester Werte auf [isWorkTime](api/method/isworktime.md) zurückzugreifen:

~~~js
gantt.config.work_time = true;

gantt.templates.scale_cell_class = function(date){
       if(!gantt.isWorkTime(date))
          return true;
};
~~~

Wenn mehrere Skalen über die Eigenschaft [gantt.config.scales](api/config/scales.md) definiert sind, wirkt sich dieses Template nur auf die erste Skala aus. Um CSS-Klassen Zellen in anderen Skalen zuzuweisen, verwenden Sie das **css**-Attribut innerhalb der [gantt.config.scales](api/config/scales.md)-Konfiguration:

~~~js
gantt.config.scales = [
    { unit: "month", step: 1, date: "%F" },
    { unit: "week", step: 1, date: "%W" },
    {
        unit: "day", step: 1, date: "%d", css: function (date) { /*!*/
            if (!gantt.isWorkTime({ date: date })) { /*!*/
                return "weekend"; /*!*/
            } /*!*/
        } /*!*/
    },
];
~~~

### Related API
- [scale_row_class](api/template/scale_row_class.md)
- [timeline_cell_class](api/template/timeline_cell_class.md)

### Related Guides
- ["Vorlagen für den Timeline-Bereich"](guides/timeline-templates.md)
- ["Ausblenden von Zeiteinheiten in der Skala"](guides/custom-scale.md)
- ["Hervorheben von Zeitfenstern"](guides/highlighting-time-slots.md)
- ["Arbeitszeitberechnung"](guides/working-time.md)
- ["Einrichten der Skala"](guides/configuring-time-scale.md#styling)

