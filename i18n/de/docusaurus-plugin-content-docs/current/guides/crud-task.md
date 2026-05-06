---
title: "Grundlegende Operationen mit Aufgaben"
sidebar_label: "Grundlegende Operationen mit Aufgaben"
---

# Grundlegende Operationen mit Aufgaben

In diesem Kapitel lernen Sie, wie man grundlegende Operationen mit Aufgaben durchführt: eine Aufgabe erstellen oder löschen, sowie eine Eigenschaft einer Aufgabe dynamisch aktualisieren.

## Eine neue Aufgabe hinzufügen

Um eine neue Aufgabe zum Gantt-Diagramm hinzuzufügen, verwenden Sie die [addTask](api/method/addtask.md) Methode:

~~~js
var taskId = gantt.addTask({
    id:10,
    text:"Projekt #1",
    start_date:"02-09-2020",
    duration:28
});
~~~

### Verhindern des Hinzufügens von Aufgaben auf bestimmten Ebenen

Eine recht einfache Möglichkeit, zu verhindern, dass Benutzer Teilaufgaben zu einer Aufgabe einer bestimmten Ebene hinzufügen (oder basierend auf einer anderen Bedingung), besteht darin, den „Add“-Button mithilfe von CSS auszublenden.

Sie können jeder Aufgabenzeile eine CSS-Klasse zuweisen, indem Sie die Vorlage [grid_row_class](api/template/grid_row_class.md) verwenden:

~~~js
gantt.templates.grid_row_class = function( start, end, task ){
    if ( task.$level > 1 ){
        return "nested_task"
    }
    return "";
};
~~~

und den „Add“-Button für solche Zeilen ausblenden:

~~~css
.nested_task .gantt_add{
    display: none !important;
}
~~~

[Predefined Project Structure](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)

## Eine Eigenschaft einer Aufgabe aktualisieren

Um eine Eigenschaft eines Aufgabenobjekts dynamisch zu aktualisieren, verwenden Sie die [updateTask](api/method/updatetask.md) Methode:

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
 
task.text = "Task #10_1";/*!*/ 
gantt.updateTask(10); /*!*/
~~~

Wenn Data Processor aktiviert ist, wird die [updateTask()](api/method/updatetask.md) Methode die Änderungen an den Server senden.

Nach der Aktualisierung der Aufgabe wird das [onAfterTaskUpdate](api/event/onaftertaskupdate.md) Ereignis ausgelöst. Es kann weitere Änderungen verursachen, zum Beispiel, wenn die automatische Terminplanung aktiviert ist, wird Gantt die Aufgabe und alle ihre Nachfolger automatisch terminiert.

Wenn Sie lediglich die Änderungen neu rendern möchten, rufen Sie stattdessen die [refreshTask()](api/method/refreshtask.md) Methode auf und verwenden Sie nicht [updateTask()](api/method/updatetask.md).

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
 
task.text = "Task #10_1"; 
gantt.refreshTask(10);
~~~

## Neuzeichnen der Aufgaben

Um alle Aufgaben im Gantt-Diagramm neu zu zeichnen, verwenden Sie die [refreshData](api/method/refreshdata.md) Methode:

~~~js
var task = gantt.getTask(10);//->{id:10,text:"Task #10",start_date:"02-09-2020",...}
var task2 = gantt.getTask(11);//->{id:11,text:"Task #11",start_date:"05-09-2020",...}
 
task.text = "Task #10_1"; /*!*/ 
task2.text = "Task #11_1";/*!*/ 
gantt.refreshData(); /*!*/ 
~~~

## Aufgaben löschen

Um eine Aufgabe zu löschen, verwenden Sie die [deleteTask](api/method/deletetask.md) Methode:

~~~js
gantt.deleteTask(taskId);
~~~

## Kaskadierendes Löschen verschachtelter Aufgaben

Es gibt eine [cascade_delete](api/config/cascade_delete.md) Konfiguration, die den Prozess des Löschens von Aufgaben aus dem Gantt regelt. Standardmäßig ist sie auf true gesetzt,
was bedeutet, dass beim Löschen einer Aufgabe eine Anfrage an den Server für jede verschachtelte Aufgabe und jeden Link der gelöschten Aufgabe gesendet wird.

Wenn Sie nicht mehrere Anfragen an den Server senden müssen, können Sie die [cascade_delete](api/config/cascade_delete.md) Konfiguration einfach deaktivieren:

~~~js
gantt.config.cascade_delete = false;
~~~

In diesem Fall sendet Gantt nur eine einzige Anfrage an den Server – zum Löschen der übergeordneten Aufgabe, während deren verschachtelte Aufgaben und Links vom Server gelöscht werden.

Die [cascade_delete](api/config/cascade_delete.md) Option beeinflusst die Art und Weise der Implementierung eines Backends. Lesen Sie mehr im entsprechenden Abschnitt des Server-seitigen Integrations-Artikels
(guides/server-side.md#cascade-deletion).

## Entfernen aller Aufgaben aus dem Gantt-Diagramm

Um das Gantt-Diagramm von Aufgaben zu bereinigen, rufen Sie die [clearAll](api/method/clearall.md) Methode auf:

~~~js
gantt.clearAll();
~~~