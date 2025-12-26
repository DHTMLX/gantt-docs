---
title: "Grundlegende Operationen mit Aufgaben"
sidebar_label: "Grundlegende Operationen mit Aufgaben"
---

# Grundlegende Operationen mit Aufgaben

In diesem Kapitel erfahren Sie, wie Sie grundlegende Aufgabenoperationen ausführen: Aufgaben erstellen, löschen und Eigenschaften dynamisch aktualisieren.


## Hinzufügen einer neuen Aufgabe

Um eine neue Aufgabe zum Gantt-Diagramm hinzuzufügen, verwenden Sie die Methode [addTask](api/method/addtask.md):

~~~js
var taskId = gantt.addTask({
    id:10,
    text:"Project #1",
    start_date:"02-09-2020",
    duration:28
});
~~~

### Verhindern des Hinzufügens von Aufgaben auf bestimmten Ebenen

Eine einfache Möglichkeit, Benutzer daran zu hindern, Unteraufgaben zu Aufgaben einer bestimmten Ebene (oder nach anderen Kriterien) hinzuzufügen, besteht darin, die Schaltfläche "Hinzufügen" per CSS auszublenden.

Sie können jeder Aufgabenzeile mit dem Template [grid_row_class](api/template/grid_row_class.md) eine CSS-Klasse zuweisen:

~~~js
gantt.templates.grid_row_class = function( start, end, task ){
    if ( task.$level > 1 ){
        return "nested_task"
    }
    return "";
};
~~~

Blenden Sie anschließend die "Add"-Schaltfläche für diese Zeilen aus:

~~~css
.nested_task .gantt_add{
    display: none !important;
}
~~~

[Predefined Project Structure](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)


## Aktualisieren einer Aufgabeneigenschaft

Um eine Eigenschaft eines Aufgabenobjekts dynamisch zu aktualisieren, verwenden Sie die Methode [updateTask](api/method/updatetask.md):

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
 
task.text = "Task #10_1";/*!*/ 
gantt.updateTask(10); /*!*/
~~~

Wenn der Data Processor aktiviert ist, sendet ein Aufruf von [updateTask()](api/method/updatetask.md) die Änderungen an den Server.

Nach der Aktualisierung der Aufgabe wird das Ereignis [onAfterTaskUpdate](api/event/onaftertaskupdate.md) ausgelöst. Dies kann weitere Aktualisierungen bewirken, wie z. B. das automatische Planen der Aufgabe und ihrer Nachfolger, falls diese Funktion aktiviert ist.

Wenn lediglich eine visuelle Aktualisierung ohne Senden der Daten an den Server erforderlich ist, verwenden Sie stattdessen die Methode [refreshTask()](api/method/refreshtask.md) anstelle von [updateTask()](api/method/updatetask.md):

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
 
task.text = "Task #10_1"; 
gantt.refreshTask(10);
~~~

## Neuzeichnen von Aufgaben

Um alle Aufgaben im Gantt-Diagramm neu zu zeichnen, verwenden Sie die Methode [refreshData](api/method/refreshdata.md):

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
var task2 = gantt.getTask(11);//->{id:11,text:"Task #11",start_date:"05-09-2020",...}
 
task.text = "Task #10_1"; /*!*/ 
task2.text = "Task #11_1";/*!*/ 
gantt.refreshData(); /*!*/ 
~~~

## Löschen von Aufgaben

Um eine Aufgabe zu entfernen, verwenden Sie die Methode [deleteTask](api/method/deletetask.md):

~~~js
gantt.deleteTask(taskId);
~~~

## Kaskadierendes Löschen von verschachtelten Aufgaben

Die Einstellung [cascade_delete](api/config/cascade_delete.md) steuert, wie Aufgabenlöschungen gehandhabt werden. Standardmäßig ist sie auf *true* gesetzt, was bedeutet, dass das Löschen einer Aufgabe Anfragen an den Server für jede verschachtelte Aufgabe und jede damit verknüpfte Verbindung auslöst.

Wenn Sie nicht möchten, dass mehrere Anfragen gesendet werden, deaktivieren Sie die Option [cascade_delete](api/config/cascade_delete.md):

~~~js
gantt.config.cascade_delete = false;
~~~

Mit dieser Einstellung sendet Gantt nur eine Anfrage zum Löschen der übergeordneten Aufgabe, während der Server das Entfernen der verschachtelten Aufgaben und Verbindungen übernimmt.

Diese Option beeinflusst die Backend-Implementierung. Weitere Informationen finden Sie im 
[entsprechenden Abschnitt des Artikels Server-side Integration](guides/server-side.md#cascadedeletion).

## Entfernen aller Aufgaben aus dem Gantt-Diagramm

Um alle Aufgaben aus dem Gantt-Diagramm zu löschen, verwenden Sie die Methode [clearAll](api/method/clearall.md):

~~~js
gantt.clearAll();
~~~

