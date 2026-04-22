---
sidebar_label: scale_cell_class
title: scale_cell_class Vorlage
description: "Gibt die CSS-Klasse an, die auf Zellen der Zeitachse des Timeline-Bereichs angewendet wird"
---

# scale_cell_class

### Description

@short: Definiert die CSS-Klasse, die den Zellen im Zeitachsenbereich der Zeitskala zugewiesen wird

@signature: scale_cell_class: (date: Date) =\> string | void;

### Parameters

- `date` - (erforderlich) *Datum* - das Datum einer Zelle

### Returns
- ` text` - (string | void) - eine CSS-Klasse für das betreffende Element

### Example

~~~js
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
- [Wochenenden hervorheben](https://docs.dhtmlx.com/gantt/samples/04_customization/06_highlight_weekend.html)

### Details

Beachten Sie, dass Sie bei der Verwendung von [Arbeitszeitberechnungen](guides/working-time.md) stattdessen [isWorkTime](api/method/isworktime.md) verwenden können, anstelle fest codierter Werte:

~~~js
gantt.config.work_time = true;

gantt.templates.scale_cell_class = function(date){
       if(!gantt.isWorkTime(date))
          return true;
};
~~~

Wenn Sie mehrere Skalen über die Eigenschaft [gantt.config.scales](api/config/scales.md) festgelegt haben, wird die Vorlage nur auf die erste Skala angewendet. Um die CSS-Klasse den Zellen jeder anderen Skala zuzuweisen, verwenden Sie das **css**-Attribut der Eigenschaft [gantt.config.scales](api/config/scales.md):

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
- [Vorlagen des Timeline-Bereichs](guides/timeline-templates.md)
- [Ausblenden von Zeiteinheiten in der Skala](guides/custom-scale.md)
- [Hervorhebung von Zeitfenstern](guides/highlighting-time-slots.md)
- [Berechnung der Arbeitszeit](guides/working-time.md)
- [Skala einrichten](guides/configuring-time-scale.md#styling)