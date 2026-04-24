---
title: "Rückgängig-/Wiederherstellungs-Funktionalität"
sidebar_label: "Rückgängig-/Wiederherstellungs-Funktionalität"
---

# Rückgängig-/Wiederherstellungs-Funktionalität

Der dhtmlxGantt-Chart ermöglicht Ihnen, die vorgenommenen Änderungen rückgängig zu machen bzw. erneut wiederherzustellen. Zur Aktivierung dieser Funktionalität müssen Sie das **undo**-Plugin über die [gantt.plugins] Methode aktivieren.

~~~js
gantt.plugins({
    undo: true
});
~~~

Standardmäßig sind sowohl Rückgängig- als auch Wiederherstellungsfunktionen aktiviert. Zur Steuerung der Rückgängig-/Wiederherstellungsfunktion verwenden Sie die Konfigurationsoptionen [undo] / [redo]. 

Sie können Rückgängig und Wiederherstellen auch getrennt voneinander nutzen, indem Sie eine der Optionen deaktivieren:

~~~js
// nur die Redo-Funktionalität ist aktiviert
gantt.config.undo = false;
gantt.config.redo = true;
~~~


[Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)


## Undo/Redo API


Um die im Gantt-Chart vorgenommenen Änderungen rückgängig zu machen, verwenden Sie die [undo](api/method/undo.md) Methode:

~~~js
gantt.undo();
~~~

Um die zuvor rückgängig gemachten Änderungen erneut wiederherzustellen, verwenden Sie die [redo](api/method/redo.md) Methode:

~~~js
gantt.redo();
~~~

Ab Version v6.3 sind die **undo()/redo()**-Methoden auch über das **gantt.ext.undo**-Objekt verfügbar. Siehe den Artikel [Undo Extension](guides/undo-ext.md). 

## Abrufen des Stapels gespeicherter Undo/Redo-Aktionen


Alle Benutzeraktionen im Gantt-Chart werden als Arrays implementiert, die Sätze von Befehl-Objekten enthalten. Die Undo-Erweiterung kann Reverse-Operationen daraus ableiten und sie in Gantt ausführen. 

Wenn Sie eine Befehl-Aktion rückgängig machen oder wiederherstellen müssen, nimmt die Erweiterung das jeweils zuletzt verwendete Befehl-Objekt und führt die entsprechende Methode aus.

Um den Stapel der gespeicherten Undo-Aktionen zu erhalten, verwenden Sie die [getUndoStack](api/method/getundostack.md) Methode:

~~~js
var stack = gantt.getUndoStack();
~~~

Um den Stapel der gespeicherten Redo-Aktionen zurückzugeben, verwenden Sie die [getRedoStack](api/method/getredostack.md) Methode:

~~~js
var stack = gantt.getRedoStack();
~~~

Der zurückgegebene Stapel ist ein Array von Benutzeraktionen. Jede Benutzeraktion enthält eine Gruppe von Befehlen:

- <span class="subproperty">**UndoRedoAction**</span> - (*object*) - ein Objekt, das die Befehle der Undo- bzw. Redo-Aktion speichert
    - **_commands_** - (*UndoRedoCommand[]*) - ein Array, das die Änderungen (Befehle) der Undo- bzw. Redo-Aktion speichert


Ein Befehl ist ein Objekt mit den folgenden Attributen:

- <span class="subproperty">**UndoRedoCommand**</span> - (*object*) - ein Objekt, das den ursprünglichen und den aktualisierten Zustand der **Task**- oder **Link**-Objekte speichert:
    - **_type_** - (*string*) - der Typ eines Befehls: "add/remove/update"
    - **_entity_** - (*string*) - der Typ des geänderten Objekts: "task" oder "link"
    - **_value_** - (*Task | Link*) - das geänderte Task-/Link-Objekt
    - **_oldValue_** - (*Task | Link*) - das Task-/Link-Objekt vor den Änderungen


Schauen Sie sich das folgende Beispiel an:

![get_undo_stack](/img/get_undo_stack.png)

Die **getUndoStack()**-Methode gibt einen Stapel mit 2 Undo-Benutzeraktionen zurück. Die erste Aktion enthält 3 Befehle, die zweite enthält 1 Befehl.

Ab Version v6.3 sind die **getUndoStack()/getRedoStack()**-Methoden auch über das **gantt.ext.undo**-Objekt verfügbar. Siehe den Artikel [Undo Extension](guides/undo-ext.md). 

## Löschen des Stapels gespeicherter Undo/Redo-Befehle


Es besteht die Möglichkeit, den Stapel der Undo/Redo-Befehle über die entsprechende Gantt-API zu löschen. 

Um den Stapel der gespeicherten Undo-Befehle zu löschen, verwenden Sie die [clearUndoStack](api/method/clearundostack.md) Methode:

~~~js
gantt.clearUndoStack();
~~~

Um den Stapel der gespeicherten Redo-Befehle zu löschen, verwenden Sie die [clearRedoStack](api/method/clearredostack.md) Methode:

~~~js
gantt.clearRedoStack();
~~~

Ab Version v6.3 sind die **clearUndoStack()/clearRedoStack()**-Methoden auch über das **gantt.ext.undo**-Objekt verfügbar. Siehe den Artikel [Undo Extension](guides/undo-ext.md). 

## Rückgängig-/Wiederherstellungsänderungen, die aus dem Code vorgenommen wurden {#undoingredoingchangesmadefromcode}

Es ist möglich, Änderungen, die am Code vorgenommen wurden, rückgängig zu machen bzw. erneut wiederherzustellen. Dazu müssen Sie die **undo()/redo()**-Methoden in Kombination mit der **saveState()**-Methode des **gantt.ext.undo**-Objekts verwenden. 

Allein verwendet verfolgt Gantt die Änderungen, die Sie direkt am Code vornehmen, nicht automatisch. Daher kann Gantt den vorherigen Zustand der Task/Link nicht speichern. Um Gantt anzuzeigen, dass Sie den ursprünglichen Wert der Task/des Links vor den Codeänderungen speichern sollen, müssen Sie die **saveState()**-Methode anwenden. Die Methode muss aufgerufen werden, bevor Sie mit der Änderung der Task beginnen.

Gantt kann jedoch nicht erkennen, wann Sie die Änderungen über die API abschließen. Um Gantt zu signalisieren, dass Sie das Aktualisieren der Task oder des Links beendet haben, müssen Sie die **updateTask()**- oder **updateLink()**-Methode anwenden. Dann werden der vorherige und der neue Zustand im Stapel der Undo-Benutzeraktionen gespeichert.

Beispiel: So können Sie den ursprünglichen Text der Task wiederherstellen, nachdem er im Code auf einen anderen Wert gesetzt wurde:

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

Die **saveState()**-Methode hat den Text "task 1" der Task mit der ID = 1 gespeichert, bevor er auf den Text "modified" aktualisiert wurde. Dann hat die Methode **gantt.ext.undo.undo()** die im Code vorgenommenen Änderungen auf den Startwert zurückgesetzt. 

Für Details zur **saveState()**-Methode siehe den Artikel [Undo Extension](guides/undo-ext.md).

## Configuring the Undo functionality


Es gibt mehrere Einstellungen, die helfen, die Undo-Operation anzupassen.

Um die Aktionen festzulegen, auf die Undo angewendet wird, verwenden Sie den Parameter [undo_actions]:

~~~js
gantt.config.undo_actions = {
    update:"update",
    remove:"remove", // entferne einen Eintrag aus dem Datastore
    add:"add"
};
~~~

Um festzulegen, wie viele Schritte rückgängig gemacht werden können, verwenden Sie den Parameter [undo_steps]:

~~~js
gantt.config.undo_steps = 10;
~~~

Standardmäßig können 10 Aktionen rückgängig gemacht werden.

Sie können außerdem die Entitäten festlegen, auf die die Undo-Operation angewendet wird, im Parameter [undo_types]:

~~~js
gantt.config.undo_types = {
    link:"link",
    task:"task"
};
~~~


## Die Liste der API-Ereignisse


Es gibt eine Reihe hilfreicher Undo-/Redo-bezogener Ereignisse:

- [onBeforeUndo](api/event/onbeforeundo.md) - wird ausgelöst, bevor die [undo](api/method/undo.md) Methode aufgerufen wird
- [onAfterUndo](api/event/onafterundo.md) - wird ausgelöst, nachdem die [undo](api/method/undo.md) Methode aufgerufen wurde
- [onBeforeRedo](api/event/onbeforeredo.md) - wird ausgelöst, bevor die [redo](api/method/redo.md) Methode aufgerufen wird
- [onAfterRedo](api/event/onafterredo.md) - wird ausgelöst, nachdem die [redo](api/method/redo.md) Methode aufgerufen wurde
- [onBeforeRedoStack](api/event/onbeforeredostack.md) - wird ausgelöst, bevor eine Aktion in den Redo-Stack eingefügt wird
- [onBeforeUndoStack](api/event/onbeforeundostack.md) - wird ausgelöst, bevor eine Aktion in den Undo-Stack eingefügt wird