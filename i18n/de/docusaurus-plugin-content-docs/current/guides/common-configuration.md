---
title: "Konfiguration"
sidebar_label: "Konfiguration"
---

# Konfiguration

Um das gewünschte Erscheinungsbild für das Gantt-Diagramm zu erreichen, bietet dhtmlxGantt zwei Hauptobjekte:

- [gantt.config](api/overview/properties-overview.md) - enthält Konfigurationsoptionen zu Datumsangaben, Skalen, Steuerelementen und mehr.
- [gantt.templates](api/overview/templates-overview.md) - beinhaltet Formatierungsvorlagen für Datums- und Beschriftungsanzeigen im Gantt-Diagramm.

## 'gantt.config'-Objekt {#ganttconfigobject}

Alle Konfigurationseinstellungen werden im **gantt.config**-Objekt festgelegt.

Um eine Option anzuwenden, weisen Sie sie einfach wie in dieser Dokumentation beschrieben zu.

Beachten Sie, dass Konfigurationsoptionen vor der Initialisierung von dhtmlxGantt gesetzt werden müssen.

~~~js
gantt.scales = [
    { unit: "year", step: 1, format: "%Y" }
];

gantt.init("gantt_here");
~~~

Eine vollständige Liste der in **gantt.config** verfügbaren Eigenschaften finden Sie unter ["Gantt API:Properties"](api/overview/properties-overview.md).


[Month view](https://docs.dhtmlx.com/gantt/samples/03_scales/02_month_days.html)


## 'gantt.templates'-Objekt

Mit Vorlagen lässt sich anpassen, wie Datumsangaben und Beschriftungen dargestellt werden.

Definieren Sie eine Vorlage, indem Sie sie wie in der Dokumentation gezeigt zuweisen. Denken Sie daran, Vorlagen vor der Initialisierung von dhtmlxGantt zu deklarieren.

~~~js
gantt.templates.task_text = function(start, end, task){
    return "<b>Text:</b> " + task.text + ",<b> Holders:</b> " + task.users;
};
gantt.init("gantt_here");
~~~

![gantt_templates](/img/gantt_templates.png)

Die vollständige Liste der verfügbaren Vorlagen finden Sie im Abschnitt [Gantt API:Templates](api/overview/templates-overview.md).


[Styling task bars with events](https://docs.dhtmlx.com/gantt/samples/04_customization/08_templates.html)
