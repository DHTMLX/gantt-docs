---
sidebar_label: timeline_placeholder
title: timeline_placeholder config
description: "zeigt das Hintergrund-Grid an, wenn die Timeline leer ist"
---

# timeline_placeholder

### Description

@short: Zeigt das Hintergrund-Grid an, wenn die Timeline leer ist

@signature: timeline_placeholder: boolean

### Example

~~~jsx
gantt.config.timeline_placeholder = false;
...
gantt.init("gantt_here");
~~~

### Related samples
- [Empty Gantt with placeholder grid and timeline](https://docs.dhtmlx.com/gantt/samples/08_api/23_empty_gantt_with_placeholder_views.html)

### Details

Das Hintergrund-Grid wird in der Timeline angezeigt, wenn keine Aufgaben im Gantt geladen sind:

![background grid](/img/background_grid_in_empty_timeline.png)

Es erscheint auch, wenn die Zeilen mit Aufgaben nicht die gesamte Timeline abdecken:

![background grid](/img/background_grid_in_timeline.png)

Um Spalten und Zellen im Hintergrund-Grid hervorzuheben, verwenden Sie die [timeline_cell_class](api/template/timeline_cell_class.md) Vorlage:

~~~js
gantt.templates.timeline_cell_class = function (task, date) {
    if (!gantt.isWorkTime({ date: date, task: task })) {
        return "weekend";
    }
};
~~~

Für Hintergrundzeilen wird ein temporäres Task-Objekt an die Vorlage übergeben. Dieses Objekt kann an seiner id erkannt werden:

~~~js
if(task.id === "timeline_placeholder_task"){
    ...
}
~~~

### Related API
- [timeline_cell_class](api/template/timeline_cell_class.md)

### Change log
- hinzugefügt in v8.0

