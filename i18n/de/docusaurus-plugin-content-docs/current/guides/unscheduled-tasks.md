---
title: "Nicht terminierte Aufgaben"
sidebar_label: "Nicht terminierte Aufgaben"
---

Nicht terminierte Aufgaben
========================

Es ist möglich, Aufgaben ohne spezifische Termine zum Gantt-Diagramm hinzuzufügen.

![unscheduled_tasks](/img/unscheduled_tasks.png)

Dies kann erreicht werden, indem die Eigenschaft **unscheduled** in der Aufgabenbeschreibung auf *true* gesetzt wird:

~~~js
{"id":1, "text":"Project #1", "type":"project", "progress": 0.6, "open": true},
{"id":2, "text":"Task #1", "unscheduled":false, "start_date":"02-04-2019", "parent":"1"},
{"id":3, "text":"Task #2", "unscheduled":true,"start_date":"","duration":"","parent":"1"}
~~~

Dadurch wird die Aufgabe mit der ID "3" im Gantt-Diagramm ohne Startdatum angezeigt und als leere Zeile dargestellt.

Um die Anzeige nicht terminierter Aufgaben zu aktivieren, passen Sie den Konfigurationsparameter [show_unscheduled](api/config/show_unscheduled.md) auf *false* an:

~~~js
gantt.config.show_unscheduled = false;
~~~

Beachten Sie, dass das Gantt-Diagramm nicht terminierten Aufgaben Standardtermine zuweist. Das bedeutet, dass die Eigenschaften **start_date/end_date** für diese Aufgaben nicht leer bleiben:

~~~js
var task = gantt.getTask(3);
console.log(task.unscheduled);
// true

console.log(task.start_date);
// Tue Jun 25 2019 18:42:50
~~~


[Show Unscheduled Tasks](https://docs.dhtmlx.com/gantt/samples/01_initialization/19_tasks_without_dates.html)

