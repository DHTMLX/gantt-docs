---
sidebar_label: timeline_placeholder
title: timeline_placeholder Konfiguration
description: "zeigt das Hintergrundgitter in der leeren Timeline"
---

# timeline_placeholder

### Description

@short: Zeigt das Hintergrundgitter in der leeren Timeline

@signature: timeline_placeholder: boolean

### Example

~~~jsx
gantt.config.timeline_placeholder = false;
...
gantt.init("gantt_here");
~~~

### Related samples
- [Leeres Gantt mit Platzhalter-Gitter und Timeline](https://docs.dhtmlx.com/gantt/samples/08_api/23_empty_gantt_with_placeholder_views.html)

### Details

Das Hintergrundgitter wird in der Timeline angezeigt, wenn keine Aufgaben in das Gantt geladen sind:

![background grid](/img/background_grid_in_empty_timeline.png)

oder wenn die Zeilen mit Aufgaben die Timeline nicht vollständig ausfüllen:

![background grid](/img/background_grid_in_timeline.png)

Um Spalten und Zellen im Hintergrundgitter hervorzuheben, verwenden Sie das [`timeline_cell_class`](api/template/timeline_cell_class.md) Template:

~~~js
gantt.templates.timeline_cell_class = function (task, date) (
    if (!gantt.isWorkTime(( date: date, task: task ))) (
        return "weekend";
    )
);
~~~

Für Hintergrundzeilen wird dem Template ein temporäres Task-Objekt hinzugefügt. Das Objekt kann anhand seiner ID identifiziert werden:

~~~js
if(task.id === "timeline_placeholder_task")(
    ...
)
~~~

### Related API
- [`timeline_cell_class`](api/template/timeline_cell_class.md)

### Change log
- hinzugefügt in v8.0