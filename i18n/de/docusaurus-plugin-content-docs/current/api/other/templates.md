---
sidebar_label: templates
title: templates config
description: "richtet Formatierungs-templates für Daten, Titel und Tooltips im Gantt-Diagramm ein"
---

# templates

### Description

@short: Richtet Formatierungs-templates für Daten, Titel und Tooltips im Gantt-Diagramm ein

@signature: templates: GanttTemplates

### Example

~~~jsx
//definiert, wie das Datum in der Spalte 'Start Time' der Tabelle angezeigt wird
gantt.templates.date_grid = function(date){
    return gantt.date.str_to_date(gantt.config.date_grid);
};
~~~

### Details

Details zum **templates**-Objekt finden Sie in einem eigenen Abschnitt auf der <br> 
Haupt-API-Seite ["Gantt API: Templates"](api/overview/templates-overview.md).
