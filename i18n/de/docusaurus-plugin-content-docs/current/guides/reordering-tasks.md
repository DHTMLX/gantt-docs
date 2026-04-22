---
title: "Aufgaben neu ordnen"
sidebar_label: "Aufgaben neu ordnen"
---

# Aufgaben neu ordnen

dhtmlxGantt bietet zwei Möglichkeiten, Aufgaben im Raster neu zu ordnen:

- Drag-and-Drop.
- Sortierung (siehe [Details](guides/sorting.md)).

Die beiden Möglichkeiten sind alternativ. Standardmäßig sind beide Modi deaktiviert. 

Um Drag-and-Drop-Neuordnung zu aktivieren, verwenden Sie die [order_branch](api/config/order_branch.md) Option: 

~~~js
gantt.config.order_branch = true;
gantt.init("gantt_here");
~~~


[Verzweigungsreihenfolge](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)

 
Sie können sich die Video-Anleitung ansehen, die zeigt, wie man Aufgaben im Grid sortiert und neu anordnet.

<iframe width="676" height="400" src="https://www.youtube.com/embed/srtb3nYOb-E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Drag-n-Drop innerhalb der gesamten Gantt-Struktur

Die [order_branch](api/config/order_branch.md) Option ermöglicht das Ziehen von Aufgaben innerhalb derselben Baum-Ebene.

Es ist auch möglich, den Modus zu aktivieren, in dem Aufgaben innerhalb der gesamten Gantt neu geordnet werden können. Das bedeutet, dass eine Aufgabe eine andere Aufgabe jeder Baum-Ebene ersetzen kann.
Um diese Art der Aufgaben-Neuordnung zu verwenden, nutzen Sie die [order_branch_free](api/config/order_branch_free.md) Option:

~~~js
// Neuordnung von Aufgaben innerhalb der gesamten Gantt
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;
 
gantt.init("gantt_here");
~~~
 

[Drag and drop rows in Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/08_drag_between_levels.html)
 


## Verweigern des Ablegens an bestimmten Positionen {#denyingdroppingtospecificpositions}

Um das Ablegen von Aufgaben an bestimmten Positionen zu verweigern, verwenden Sie das [onBeforeTaskMove](api/event/onbeforetaskmove.md) oder das [onBeforeRowDragEnd](api/event/onbeforerowdragend.md) Ereignis:

~~~js
//verhindert das Verschieben in ein anderes Sub-Branch:
gantt.attachEvent("onBeforeTaskMove", function(id, parent, tindex){
    var task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});

//oder
gantt.attachEvent("onBeforeRowDragEnd", function(id, parent, tindex){
      var task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});
~~~

## Leistungsverbesserung bei großen Datensätzen

Wenn Ihr Gantt viele Aufgaben enthält, kann der Standardmodus der Branch-Neuordnung die Leistung verlangsamen.
Um ihn zu beschleunigen, können Sie den "marker"-Modus verwenden. 

~~~js
gantt.config.order_branch = "marker";
~~~


[Branch ordering - highlighting mode](https://docs.dhtmlx.com/gantt/samples/07_grid/14_branch_ordering_highlight.html)


In diesem Modus wird nur der Name der Aufgabe neu geordnet (bei gedrückter linker Maustaste) und Gantt wird neu gerendert, nur wenn eine Aufgabe an der Zielposition abgelegt wird (bei Loslassen der Maustaste).
Im Gegensatz zum Standardmodus führt eine Änderung der Position einer Aufgabe nicht zur Auslösung der onBeforeTaskMove/onAfterTaskMove-Ereignisse.

Um das Ablegen einer Aufgabe an einer bestimmten Position zu verhindern, verwenden Sie stattdessen das [onBeforeRowDragMove](api/event/onbeforerowdragmove.md) Ereignis (funktioniert nur im "marker"-Modus).


## Hervorheben verfügbarer Ablegeplätze während Drag-&-Drop

Um während des Ziehens verfügbare Zielplätze hervorzuheben (zum Beispiel ist es nicht möglich, den Wurzelknoten unter einen anderen Wurzelknoten zu ziehen und Sie möchten den Benutzer visuell darüber informieren),
verwenden Sie die Ereignisse [onRowDragStart](api/event/onrowdragstart.md) und [onRowDragEnd](api/event/onrowdragend.md): 

~~~js
gantt.config.order_branch = true;// order tasks only inside a branch
gantt.init("gantt_here");
gantt.parse(demo_tasks);

var drag_id = null;
gantt.attachEvent("onRowDragStart", function(id, target, e) {
    drag_id = id;
    return true;
});
gantt.attachEvent("onRowDragEnd", function(id, target) {
    drag_id = null;
    gantt.render();
});

gantt.templates.grid_row_class = function(start, end, task){
    if(drag_id && task.id != drag_id){
        if(task.$level != gantt.getTask(drag_id).$level)
            return "cant-drop";
        }
    return "";
};
~~~

## Aufgaben vertikal in der Timeline neu ordnen

Folgen Sie den im Abschnitt [Wie man Aufgaben in der Timeline vertikal neu ordnet](guides/how-to.md#how-to-vertically-reorder-tasks-in-the-timeline) gegebenen Beispielen.