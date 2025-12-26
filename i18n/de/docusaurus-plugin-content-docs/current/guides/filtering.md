---
title: "Aufgaben filtern"
sidebar_label: "Aufgaben filtern"
---

# Aufgaben filtern

Das Filtern hilft dabei, zu steuern, welche Aufgaben im Gantt-Diagramm angezeigt werden, indem deren Anzahl und Typ eingeschränkt werden. So kann beispielsweise festgelegt werden, dass nur Aufgaben angezeigt werden, die einem bestimmten Mitarbeiter zugewiesen sind oder als dringend markiert wurden.

Beachten Sie, dass dhtmlxGantt die Filterung auf der Client-Seite unterstützt.

![filtering](/img/filtering.png)

Um eine Filterung anzuwenden, verwenden Sie das @[onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md)-Ereignis und geben Sie zurück:

- *true*, um eine Aufgabe anzuzeigen
- *false*, um eine Aufgabe auszublenden

**Nur Aufgaben mit hoher Priorität anzeigen**
~~~js
gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
    if (task.priority == "high"){
        return true;
    }
    return false;
});
~~~


[Basic filtering](https://docs.dhtmlx.com/gantt/samples/07_grid/03_filtering.html)


Um Teile einer geteilten Aufgabe zu filtern, verwenden Sie das @[onBeforeSplitTaskDisplay](api/event/onbeforesplittaskdisplay.md)-Ereignis.

Es gibt außerdem eine Videoanleitung, die zeigt, wie Sie die Aufgabenfilterung einrichten können.

<iframe width="676" height="400" src="https://www.youtube.com/embed/LyJ3zKSrmH4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

