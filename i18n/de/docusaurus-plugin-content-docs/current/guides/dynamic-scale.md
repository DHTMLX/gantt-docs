---
title: "Dynamische Änderung der Skalierungseinstellungen"
sidebar_label: "Dynamische Änderung der Skalierungseinstellungen"
---

Dynamische Änderung der Skalierungseinstellungen 
=================================================

Die Möglichkeit, die Skalierung einer Gantt-Diagramm-Ansicht dynamisch anzupassen, macht das Diagramm flexibel und ermöglicht es, auf unterschiedliche Benutzeranforderungen einzugehen.

Ein Manager, der beispielsweise ein einjähriges Projekt betreut, bevorzugt möglicherweise die Anzeige des Zeitplans nach Monaten, um einen Überblick zu erhalten. Beim Fokussieren auf die Details einer Aufgabe kann jedoch das Umschalten auf eine Wochen- oder Tagesansicht hilfreich sein, um präzisere Informationen zu erhalten.

Warum sich auf nur eine Option beschränken? Es ist am besten, alle Optionen anzubieten und dem Benutzer die Wahl der passenden Skalierung zu überlassen.


## Konfigurationseinstellungen

Um die Einstellungen der Skalierung dynamisch zu ändern (nachdem dhtmlxGantt initialisiert wurde), gehen Sie wie folgt vor:

1. Weisen Sie den entsprechenden Konfigurationsoptionen neue Werte zu.

 *Um beispielsweise die Einheit der Skalierung von "month" auf "day" zu ändern, passen Sie die **unit**-Eigenschaft in der [scales](api/config/scales.md)-Konfiguration an*.
2. Aktualisieren Sie gegebenenfalls das zugehörige Template.

 *Um beispielsweise [Wochenenden in der Skala hervorzuheben](guides/highlighting-time-slots.md), passen Sie das Template [scale_cell_class](api/template/scale_cell_class.md) an*.
2. Zeichnen Sie das Gantt-Diagramm mit der Methode [render](api/method/render.md) neu.

**Dynamische Änderung der Skalierungskonfiguration**
~~~js
gantt.config.scales = [
    {unit: "month", step: 1, format: "%F, %Y"},
];

gantt.init("gantt_here");


gantt.config.scales = [                            /*!*/
    {unit: "day", step: 1, format: "%d %M, %D"} /*!*/
];                                                /*!*/
gantt.templates.scale_cell_class = function(date){/*!*/
    if(date.getDay()==0||date.getDay()==6){/*!*/
        return "weekend";/*!*/
    }/*!*/
};/*!*/
gantt.render(); /*!*/
~~~

