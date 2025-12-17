---
title: "Aufgaben neu anordnen"
sidebar_label: "Aufgaben neu anordnen"
---

Aufgaben neu anordnen
=====================

dhtmlxGantt bietet zwei Möglichkeiten, Aufgaben im Grid neu anzuordnen:

1. Drag-and-Drop.
2. Sortierung (siehe [Details](guides/sorting.md)).

Diese Methoden schließen sich gegenseitig aus. Standardmäßig sind beide deaktiviert.

Um die Neuordnung per Drag-and-Drop zu aktivieren, setzen Sie die Option [order_branch](api/config/order_branch.md):

~~~js
gantt.config.order_branch = true;
gantt.init("gantt_here");
~~~


[Branch ordering](https://docs.dhtmlx.com/gantt/samples/07_grid/02_branch_ordering.html)


Es gibt auch ein Video-Tutorial, das zeigt, wie Aufgaben im Grid sortiert und neu angeordnet werden können.

<iframe width="676" height="400" src="https://www.youtube.com/embed/srtb3nYOb-E" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Drag-and-Drop über die gesamte Gantt-Struktur hinweg
----------------------------------------------------

Die Option [order_branch](api/config/order_branch.md) beschränkt das Ziehen auf Aufgaben innerhalb derselben Baumebene.

Es ist jedoch möglich, einen Modus zu aktivieren, in dem Aufgaben an jeder beliebigen Stelle im Gantt neu angeordnet werden können, sodass eine Aufgabe eine andere auf jeder Baumebene ersetzen kann. Dazu verwenden Sie die Option [order_branch_free](api/config/order_branch_free.md):

~~~js
// Neuordnung von Aufgaben im gesamten Gantt
gantt.config.order_branch = true;
gantt.config.order_branch_free = true;

gantt.init("gantt_here");
~~~


[Drag and drop rows in Grid](https://docs.dhtmlx.com/gantt/samples/07_grid/08_drag_between_levels.html)


Einschränkung der Ablagepositionen
----------------------------------

Um zu verhindern, dass Aufgaben an bestimmten Positionen abgelegt werden, verwenden Sie die Events [onBeforeTaskMove](api/event/onbeforetaskmove.md) oder [onBeforeRowDragEnd](api/event/onbeforerowdragend.md):

~~~js
// Verhindert das Verschieben in einen anderen Unterzweig:
gantt.attachEvent("onBeforeTaskMove", function(id, parent, tindex){
    var task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});

// oder
gantt.attachEvent("onBeforeRowDragEnd", function(id, parent, tindex){
    var task = gantt.getTask(id);
    if(task.parent != parent)
        return false;
    return true;
});
~~~

Leistungsverbesserung bei großen Datenmengen
--------------------------------------------

Bei der Arbeit mit vielen Aufgaben kann der Standardmodus zur Zweigneuordnung die Leistung beeinträchtigen. Um dies zu verbessern, kann der "marker"-Modus verwendet werden.

~~~js
gantt.config.order_branch = "marker";
~~~


[Branch ordering - highlighting mode](https://docs.dhtmlx.com/gantt/samples/07_grid/14_branch_ordering_highlight.html)


In diesem Modus wird beim Halten der linken Maustaste nur der Aufgabenname verschoben und das Gantt-Diagramm wird erst neu gerendert, wenn die Aufgabe abgelegt wird. Im Gegensatz zum Standardmodus werden beim Ändern der Aufgabenpositionen keine onBeforeTaskMove- oder onAfterTaskMove-Events ausgelöst.

Um das Ablegen von Aufgaben an bestimmten Positionen in diesem Modus einzuschränken, verwenden Sie das Event [onBeforeRowDragMove](api/event/onbeforerowdragmove.md) (dies funktioniert nur im "marker"-Modus).

Hervorheben verfügbarer Ablageziele während des Drag-and-Drop
-------------------------------------------------------------

Um beim Ziehen gültige Ablageziele visuell hervorzuheben (z. B. um zu verhindern, dass ein Wurzelknoten unter einen anderen Wurzelknoten verschoben wird), verwenden Sie die Events [onRowDragStart](api/event/onrowdragstart.md) und [onRowDragEnd](api/event/onrowdragend.md):

~~~js
gantt.config.order_branch = true; // Aufgaben nur innerhalb eines Zweigs anordnen
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

Vertikales Neuordnen von Aufgaben in der Zeitleiste
---------------------------------------------------

Siehe die Beispiele im Abschnitt [Wie man Aufgaben in der Zeitleiste vertikal neu anordnet](guides/how-to.md#howtoverticallyreordertasksinthetimeline) für weitere Hinweise.

