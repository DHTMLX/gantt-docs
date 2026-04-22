---
title: "Ungeplante Aufgaben"
sidebar_label: "Ungeplante Aufgaben"
---

# Ungeplante Aufgaben

Es besteht die Möglichkeit, Aufgaben ohne Datum in das Gantt-Diagramm hinzuzufügen.

![ungeplante_aufgaben](/img/unscheduled_tasks.png)

Es kann implementiert werden, indem in der Beschreibung der Aufgabe die Eigenschaft **unscheduled** mit dem Wert *true* gesetzt wird:

~~~js
{"id":1, "text":"Project #1", "type":"project", "progress": 0.6, "open": true},
{"id":2, "text":"Task #1", "unscheduled":false, "start_date":"02-04-2019", "parent":"1"},
{"id":3, "text":"Task #2", "unscheduled":true,"start_date":"","duration":"","parent":"1"}
~~~

Auf diese Weise wird die Aufgabe mit der ID "3" dem Gantt-Diagramm ohne Startdatum hinzugefügt und als eine leere Zeile angezeigt.

Um ungeplante Aufgaben anzuzeigen, verwenden Sie den Konfigurationsparameter [show_unscheduled](api/config/show_unscheduled.md), der auf *false* gesetzt ist:

~~~js
gantt.config.show_unscheduled = false;
~~~

Beachten Sie, dass dem Gantt-Diagramm standardmäßig Daten für ungeplante Aufgaben zugewiesen werden. Das bedeutet, dass die Eigenschaften **start_date/end_date** solcher Task-Objekte nicht leer sein werden:

~~~js
var task = gantt.getTask(3);
console.log(task.unscheduled);
// true

console.log(task.start_date);
// Tue Jun 25 2019 18:42:50
~~~

[Ungeplante Aufgaben anzeigen](https://docs.dhtmlx.com/gantt/samples/01_initialization/19_tasks_without_dates.html)