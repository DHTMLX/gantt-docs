---
title: "Grundlegende Operationen mit Aufgaben"
sidebar_label: "Grundlegende Operationen mit Aufgaben"
---

# Grundlegende Operationen mit Aufgaben

In diesem Kapitel lernen Sie, wie Sie grundlegende Operationen mit Aufgaben durchführen: eine Aufgabe erstellen oder löschen und eine Eigenschaft einer Aufgabe dynamisch aktualisieren.

## Hinzufügen einer neuen Aufgabe

Um eine neue Aufgabe zum Gantt-Diagramm hinzuzufügen, verwenden Sie die [`addTask()`](api/method/addtask.md) Methode:

~~~js
const taskId = gantt.addTask({
    id: 10,
    text: "Project #1",
    start_date: "2027-09-02",
    duration: 28
});
~~~

### Verhindern des Hinzufügens von Aufgaben zu bestimmten Ebenen

Ein einfacher Weg, Benutzer daran zu hindern, Unteraufgaben zu einer Aufgabe auf einer bestimmten Ebene hinzuzufügen, oder basierend auf einer anderen Bedingung, besteht darin, die 'Add'-Schaltfläche über CSS zu verstecken.

Sie können jeder Aufgabenzeile eine CSS-Klasse zuweisen, indem Sie die Template-Funktion [`grid_row_class`](api/template/grid_row_class.md) verwenden:

~~~js
gantt.templates.grid_row_class = (start, end, task) => {
    if (task.$level > 1) {
        return "nested_task";
    }
    return "";
};
~~~

und verstecken Sie die 'Add'-Schaltfläche für solche Zeilen:

~~~css
.nested_task .gantt_add {
    display: none !important;
}
~~~

[Vordefinierte Projektstruktur](https://docs.dhtmlx.com/gantt/samples/08_api/11_project_structure.html)


## Aktualisieren einer Eigenschaft der Aufgabe

Um eine Eigenschaft eines Aufgabenobjekts dynamisch zu aktualisieren, verwenden Sie die [`updateTask()`](api/method/updatetask.md) Methode:

~~~js {3-4}
const task = gantt.getTask(10); // -> { id: 10, text: "Task #10", start_date: "2027-09-02", ... }

task.text = "Task #10_1";
gantt.updateTask(10);
~~~

Wenn der Data Processor aktiviert ist, sorgt die [`updateTask()`](api/method/updatetask.md) Methode dafür, dass die Änderungen an den Server gesendet werden.

Nachdem die Aufgabe aktualisiert wurde, wird das Ereignis [`onAfterTaskUpdate`](api/event/onaftertaskupdate.md) ausgelöst. Es kann weitere Änderungen auslösen. Zum Beispiel, wenn die automatische Terminplanung aktiviert ist, plant Gantt die Aufgabe und alle ihre Nachfolger automatisch neu.

Wenn Sie lediglich die Änderungen erneut rendern müssen, rufen Sie die [`refreshTask()`](api/method/refreshtask.md) Methode statt [`updateTask()`](api/method/updatetask.md) auf.

~~~js
const task = gantt.getTask(10); // -> { id: 10, text: "Task #10", start_date: "2027-09-02", ... }

task.text = "Task #10_1";
gantt.refreshTask(10);
~~~

## Neuzeichnen der Aufgaben

Um alle Aufgaben im Gantt-Diagramm neu zu zeichnen, verwenden Sie die [`refreshData()`](api/method/refreshdata.md) Methode:

~~~js {4-6}
const firstTask = gantt.getTask(10); // -> { id: 10, text: "Task #10", start_date: "2027-09-02", ... }
const secondTask = gantt.getTask(11); // -> { id: 11, text: "Task #11", start_date: "2027-09-05", ... }

firstTask.text = "Task #10_1";
secondTask.text = "Task #11_1";
gantt.refreshData();
~~~ 

## Löschen von Aufgaben

Um eine Aufgabe zu löschen, verwenden Sie die [`deleteTask()`](api/method/deletetask.md) Methode:

~~~js
gantt.deleteTask(taskId);
~~~

## Kaskadierendes Löschen verschachtelter Aufgaben

Es gibt eine [cascade_delete](api/config/cascade_delete.md) Konfiguration, die den Prozess des Löschens von Aufgaben aus dem Gantt regelt. Standardmäßig ist sie auf *true* gesetzt,
was bedeutet, dass beim Löschen einer Aufgabe eine Anfrage an den Server für jede verschachtelte Aufgabe und jeden Link der gelöschten Aufgabe gesendet wird.

Wenn Sie nicht mehrere Anfragen an den Server senden müssen, können Sie die cascade_delete-Konfiguration einfach deaktivieren:

~~~js
gantt.config.cascade_delete = false;
~~~

In diesem Fall sendet Gantt nur eine einzige Anfrage an den Server zum Löschen der übergeordneten Aufgabe, während deren verschachtelte Aufgaben und Links vom Server gelöscht werden.

Die [cascade_delete](api/config/cascade_delete.md) Option wirkt sich auf die Implementierung eines Backends aus. Lesen Sie mehr im
[verwandten Abschnitt des Server-side Integration-Artikels](guides/server-side.md#cascade-deletion).

## Alle Aufgaben aus dem Gantt-Diagramm entfernen

Um das Gantt-Diagramm von Aufgaben zu bereinigen, rufen Sie die [`clearAll()`](api/method/clearall.md) Methode auf:

~~~js
gantt.clearAll();
~~~