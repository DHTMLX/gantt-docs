---
title: "Undo/Redo-Funktionalität"
sidebar_label: "Undo/Redo-Funktionalität"
---

# Undo/Redo-Funktionalität


Das dhtmlxGantt Chart unterstützt das Rückgängigmachen und Wiederherstellen von Änderungen innerhalb des Diagramms. Um diese Funktion zu aktivieren, aktivieren Sie das **undo**-Plugin mit der [gantt.plugins](api/method/plugins.md)-Methode.

~~~js
gantt.plugins({
    undo: true
});
~~~

Standardmäßig sind sowohl Undo als auch Redo aktiviert. Sie können das Verhalten von Undo/Redo über die Konfigurationsoptionen [undo](api/config/undo.md) und [redo](api/config/redo.md) steuern.

Undo und Redo können auch unabhängig voneinander verwendet werden, indem Sie eines von beiden deaktivieren:

~~~js
// hier ist nur Redo aktiviert
gantt.config.undo = false;
gantt.config.redo = true;
~~~


[Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)


## Undo/Redo API


Um Änderungen im Gantt Chart rückgängig zu machen, verwenden Sie die [undo](api/method/undo.md)-Methode:

~~~js
gantt.undo();
~~~

Um rückgängig gemachte Änderungen wiederherzustellen, verwenden Sie die [redo](api/method/redo.md)-Methode:

~~~js
gantt.redo();
~~~

Ab Version 6.3 sind die Methoden **undo()/redo()** auch über das **gantt.ext.undo**-Objekt zugänglich. Weitere Informationen finden Sie im Artikel [Undo Extension](guides/undo-ext.md).

## Abrufen des Stapels gespeicherter Undo/Redo-Aktionen


Benutzeraktionen im Gantt Chart werden als Arrays von Befehlsobjekten gespeichert. Gantt führt einen Stapel der zuletzt ausgeführten Befehle. Die **undo**-Erweiterung verarbeitet diese Befehle, um Rückgängig-Operationen auszuführen.

Beim Rückgängigmachen oder Wiederherstellen nimmt die Erweiterung das zuletzt ausgeführte Befehlsobjekt und führt die entsprechende Methode aus.

Um den Stapel der Undo-Aktionen abzurufen, verwenden Sie die [getUndoStack](api/method/getundostack.md)-Methode:

~~~js
var stack = gantt.getUndoStack();
~~~

Um den Stapel der Redo-Aktionen zu erhalten, verwenden Sie die [getRedoStack](api/method/getredostack.md)-Methode:

~~~js
var stack = gantt.getRedoStack();
~~~

Der zurückgegebene Stapel ist ein Array von Benutzeraktionen. Jede Aktion enthält eine Gruppe von Befehlen:

- <span class="subproperty">**UndoRedoAction**</span> - (*object*) - speichert die Befehle, die mit der Undo- oder Redo-Aktion verbunden sind
    - **_commands_** - (*UndoRedoCommand[]*) - ein Array, das die Änderungen (Befehle) für die Undo- oder Redo-Aktion enthält.

Jeder Befehl ist ein Objekt mit diesen Eigenschaften:

- <span class="subproperty">**UndoRedoCommand**</span> - (*object*) - enthält den ursprünglichen und den aktualisierten Zustand von **Task**- oder **Link**-Objekten:
    - **_type_** - (*string*) - Befehlstyp: "add", "remove" oder "update"
    - **_entity_** - (*string*) - der Typ des geänderten Objekts: "task" oder "link"
    - **_value_** - (*Task | Link*) - das geänderte Task- oder Link-Objekt
    - **_oldValue_** - (*Task | Link*) - das Task- oder Link-Objekt vor der Änderung

Hier ein Beispiel zur Veranschaulichung:

![get_undo_stack](/img/get_undo_stack.png)

Die **getUndoStack()**-Methode gibt einen Stapel mit 2 Undo-Aktionen zurück. Die erste enthält 3 Befehle, die zweite einen Befehl.

Ab Version 6.3 sind die Methoden **getUndoStack()/getRedoStack()** ebenfalls über das **gantt.ext.undo**-Objekt verfügbar. Weitere Informationen finden Sie im Artikel [Undo Extension](guides/undo-ext.md).

## Löschen des Stapels gespeicherter Undo/Redo-Befehle


Sie können die Undo/Redo-Befehlsstapel mit den entsprechenden Gantt-API-Methoden leeren.

Um den Undo-Stapel zu leeren, verwenden Sie die [clearUndoStack](api/method/clearundostack.md)-Methode:

~~~js
gantt.clearUndoStack();
~~~

Um den Redo-Stapel zu leeren, verwenden Sie die [clearRedoStack](api/method/clearredostack.md)-Methode:

~~~js
gantt.clearRedoStack();
~~~

Ab Version 6.3 sind die Methoden **clearUndoStack()/clearRedoStack()** ebenfalls über das **gantt.ext.undo**-Objekt zugänglich. Weitere Details finden Sie im Artikel [Undo Extension](guides/undo-ext.md).

## Rückgängigmachen/Wiederherstellen von Änderungen aus dem Code


Das Rückgängigmachen oder Wiederherstellen von programmatisch vorgenommenen Änderungen ist möglich, indem Sie die Methoden **undo()/redo()** mit der **saveState()**-Methode aus dem **gantt.ext.undo**-Objekt kombinieren.

Da Gantt Änderungen, die direkt im Code vorgenommen werden, nicht automatisch verfolgt, muss es informiert werden, den vorherigen Zustand vor der Änderung zu speichern. Dies geschieht durch einen Aufruf von **saveState()** vor der Änderung der Aufgabe oder des Links.

Gantt benötigt außerdem ein Signal, dass die Aktualisierungen abgeschlossen sind. Dies erfolgt durch den Aufruf von **updateTask()** oder **updateLink()**. So werden der vorherige und der neue Zustand im Undo-Stapel gespeichert.

Das folgende Beispiel setzt den Text einer Aufgabe zurück, nachdem er programmatisch geändert wurde:

~~~js
const undoExtension = gantt.ext.undo;
const task = gantt.getTask(1);

console.log(task.text);
// ->  "task 1";

undoExtension.saveState(task.id, "task"); /*!*/

task.text = "modified"; /*!*/
gantt.updateTask(1); /*!*/

console.log(task.text);
// ->  "modified";

undoExtension.undo();

console.log(task.text);
// ->  "task 1";
~~~

Hier speichert die **saveState()**-Methode den ursprünglichen Text "task 1", bevor er auf "modified" geändert wird. Durch den anschließenden Aufruf von **gantt.ext.undo.undo()** wird der Text auf den ursprünglichen Wert zurückgesetzt.

Weitere Informationen zu **saveState()** finden Sie im Artikel [Undo Extension](guides/undo-ext.md).

## Konfiguration der Undo-Funktionalität


Mehrere Einstellungen ermöglichen die Anpassung der Undo-Operation.

Verwenden Sie den [undo_actions](api/config/undo_actions.md)-Parameter, um festzulegen, welche Aktionen durch Undo abgedeckt werden:

~~~js
gantt.config.undo_actions = {
    update:"update",
    remove:"remove", // entfernt ein Element aus dem Datenspeicher
    add:"add"
};
~~~

Um festzulegen, wie viele Undo-Schritte verfügbar sind, verwenden Sie den [undo_steps](api/config/undo_steps.md)-Parameter:

~~~js
gantt.config.undo_steps = 10;
~~~

Standardmäßig können bis zu 10 Aktionen rückgängig gemacht werden.

Sie können auch definieren, für welche Entitäten Undo gilt, indem Sie den [undo_types](api/config/undo_types.md)-Parameter verwenden:

~~~js
gantt.config.undo_types = {
    link:"link",
    task:"task"
};
~~~


## Liste der API-Events


Es gibt mehrere Events, die sich auf die Undo/Redo-Funktionalität beziehen:

- [onBeforeUndo](api/event/onbeforeundo.md) - wird ausgelöst, bevor die [undo](api/method/undo.md)-Methode ausgeführt wird
- [onAfterUndo](api/event/onafterundo.md) - wird ausgelöst, nachdem die [undo](api/method/undo.md)-Methode abgeschlossen wurde
- [onBeforeRedo](api/event/onbeforeredo.md) - wird ausgelöst, bevor die [redo](api/method/redo.md)-Methode ausgeführt wird
- [onAfterRedo](api/event/onafterredo.md) - wird ausgelöst, nachdem die [redo](api/method/redo.md)-Methode abgeschlossen wurde
- [onBeforeRedoStack](api/event/onbeforeredostack.md) - wird ausgelöst, bevor eine Aktion zum Redo-Stapel hinzugefügt wird
- [onBeforeUndoStack](api/event/onbeforeundostack.md) - wird ausgelöst, bevor eine Aktion zum Undo-Stapel hinzugefügt wird

