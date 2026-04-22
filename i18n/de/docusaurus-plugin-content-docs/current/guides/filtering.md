---
title: "Aufgaben filtern"
sidebar_label: "Aufgaben filtern"
---

# Aufgaben filtern

Die Filterung ermöglicht es Ihnen, die Anzahl und die Eigenschaften der im Gantt-Diagramm dargestellten Aufgaben zu steuern. Beispielsweise können Sie die Filterung verwenden, um die Aufgaben anzuzeigen, die einem bestimmten Mitarbeiter zugewiesen sind, oder die Aufgaben mit dringender Priorität.

Hinweis: dhtmlxGantt unterstützt clientseitiges Filtern.

![Filterung](/img/filtering.png)

Um Daten zu filtern, verwenden Sie das [onBeforeTaskDisplay] Ereignis und geben Sie Folgendes zurück:

- *true*, für eine Aufgabe, die Sie anzeigen möchten
- *false*, für eine Aufgabe, die Sie nicht anzeigen möchten

**Nur Aufgaben mit hoher Priorität anzeigen**
~~~js
gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
    if (task.priority == "high"){
        return true;
    }
    return false;
});
~~~

[Grundlegende Filterung](https://docs.dhtmlx.com/gantt/samples/07_grid/03_filtering.html)

Um Daten einer aufgeteilten Aufgabe zu filtern, wenden Sie das [onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md) Ereignis an.

Sie können sich die Videoanleitung ansehen, die zeigt, wie Sie das Filtern von Aufgaben implementieren.

<iframe width="676" height="400" src="https://www.youtube.com/embed/LyJ3zKSrmH4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>