---
title: "Konfiguration"
sidebar_label: "Konfiguration"
---

# Konfiguration

Um das gewünschte Aussehen des Gantt-Diagramms zu erreichen, stellt dhtmlxGantt zwei Objekte bereit:

- [gantt.config] - Konfigurationsoptionen für Datumsangaben, Skala, Steuerelemente usw.
- [gantt.templates] - Formatvorlagen für Daten und Bezeichnungen, die im Gantt-Diagramm verwendet werden.

## 'gantt.config' Objekt {#ganttconfigobject}

Alle Konfigurationsoptionen sind im Objekt **gantt.config** deklariert. 

Um die gewünschte Option festzulegen, schreiben Sie sie einfach so, wie in dieser Dokumentation angegeben.
  
Hinweis, die Konfigurationsoptionen sollten vor der Codezeile mit der Initialisierung von dhtmlxGantt stehen. 


~~~js
gantt.scales = [
    { unit: "year", step: 1, format: "%Y" }
];

gantt.init("gantt_here");
~~~

Siehe die vollständige Liste der **gantt.config** Eigenschaften in ["Gantt API:Properties"](api/overview/properties-overview.md).


**Zugehöriges Beispiel**: [Monatsansicht](https://docs.dhtmlx.com/gantt/samples/03_scales/02_month_days.html)


## 'gantt.templates' Objekt {#gantttemplatesobject}

Vorlagen können verwendet werden, um die Anzeige von Daten und Bezeichnungen zu ändern.

Um eine Vorlage zu definieren, schreiben Sie sie einfach so, wie in dieser Dokumentation angegeben. Denken Sie daran, dass die Definitionen von Vorlagen vor der Codezeile mit der Initialisierung von dhtmlxGantt stehen sollten.


~~~js
gantt.templates.task_text =
    (start, end, task) => `<b>Text:</b> ${task.text},<b> Holders:</b> ${task.users}`;

gantt.init("gantt_here");
~~~


![gantt_templates](/img/gantt_templates.png)

Siehe die vollständige Liste der verfügbaren Templates im Abschnitt [Gantt API:Templates](api/overview/templates-overview.md) .

**Verwandtes Beispiel**: [Styling von Aufgabenbalken mit Ereignissen](https://docs.dhtmlx.com/gantt/samples/04_customization/08_templates.html)